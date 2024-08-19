import React, { useState } from "react";
import {
  Button,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { GROUP, SubGroupRenderTypes } from "@/types";
import { DATA } from "@/mock/groupData";

const ITEM_HEIGHT = 80;
const GAP = 8;

const SubGroupRender = ({ val }: SubGroupRenderTypes) => {
  const theme = useTheme();

  return (
    <Animated.View layout={LinearTransition} style={styles.subList}>
      <Text
        style={[
          styles.title,
          { color: theme.colors.text, opacity: 0.8, fontSize: 13 },
        ]}
      >
        {val.name}
      </Text>
      <Text
        style={[
          styles.desc,
          { color: theme.colors.text, opacity: 0.6, fontSize: 12 },
        ]}
      >
        {val.description}
      </Text>
    </Animated.View>
  );
};

const RenderItem = ({
  item,
  bottomPadding,
}: {
  item: GROUP;
  bottomPadding: SharedValue<number>;
}) => {
  const theme = useTheme();
  const [isSubGroups, setSubGroups] = useState(false);
  const [extraPadding, setExtraPadding] = useState(0);

  const animatedCardLayout = useAnimatedStyle(() => ({
    padding: withTiming(isSubGroups ? 10 : 0, {
      duration: 200,
      easing: Easing.inOut(Easing.linear),
    }),
    borderRadius: withTiming(isSubGroups ? 20 : 10, {
      duration: 200,
      easing: Easing.inOut(Easing.linear),
    }),
  }));

  const animatedChevronIcon = useAnimatedStyle(() => ({
    transform: [{ rotate: withTiming(isSubGroups ? "180deg" : "0deg") }],
  }));

  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setExtraPadding(height);
  };

  const setGroup = () => {
    if (item.subGroups?.length > 0) {
      if (isSubGroups) {
        setTimeout(() => {
          setSubGroups(false);
        }, 150);
        bottomPadding.value += extraPadding;
        setTimeout(() => {
          bottomPadding.value = withTiming(0, { duration: 800 });
        }, 50);
      } else {
        setSubGroups(true);
      }
    }
  };

  return (
    <Animated.View
      layout={LinearTransition.easing(Easing.linear).duration(100)}
      onLayout={isSubGroups ? onLayout : undefined}
      style={[
        animatedCardLayout,
        styles.cardLayout,
        { backgroundColor: theme.colors.depthCard },
      ]}
    >
      <Pressable
        onPress={setGroup}
        style={[styles.groupListItem, { backgroundColor: theme.colors.card }]}
      >
        {item.subGroups?.length > 0 && (
          <Animated.View style={[styles.chevronIcon, animatedChevronIcon]}>
            <Ionicons name="chevron-down" size={20} color={theme.colors.text} />
          </Animated.View>
        )}
        <Text
          style={[styles.title, { color: theme.colors.text, opacity: 0.8 }]}
        >
          {item.name}
        </Text>
        <Text style={[styles.desc, { color: theme.colors.text, opacity: 0.6 }]}>
          {item.description}
        </Text>
      </Pressable>
      {isSubGroups && item.subGroups?.length > 0 && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          layout={LinearTransition.easing(Easing.linear).duration(100)}
          style={styles.subGroupWrapper}
        >
          {item.subGroups.map((val, i) => (
            <SubGroupRender
              key={val.id}
              val={val}
              i={i}
              isSubGroups={isSubGroups}
            />
          ))}
        </Animated.View>
      )}
    </Animated.View>
  );
};

const InteractionList = () => {
  const bottomPadding = useSharedValue(0);

  const animatedPadding = useAnimatedStyle(() => ({
    paddingBottom: bottomPadding.value,
  }));

  return (
    <Animated.ScrollView contentInsetAdjustmentBehavior="automatic">
      <Animated.View
        layout={LinearTransition}
        style={[styles.contentContainer, animatedPadding]}
      >
        {DATA.map((item, index) => (
          <RenderItem key={item.id} item={item} bottomPadding={bottomPadding} />
        ))}
      </Animated.View>
    </Animated.ScrollView>
  );
};

export default InteractionList;

const styles = StyleSheet.create({
  contentContainer: {
    gap: GAP,
    margin: 20,
    paddingBottom: 20,
    maxWidth: 428,
    alignSelf: "center",
  },
  cardLayout: {
    overflow: "hidden",
    borderRadius: 20,
  },
  groupListItem: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    paddingHorizontal: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  subList: {
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    overflow: "hidden",
  },
  subGroupWrapper: {
    marginTop: 5,
    position: "relative",
    width: "100%",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
  },
  desc: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: "500",
  },
  chevronIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    opacity: 0.8,
  },
});
