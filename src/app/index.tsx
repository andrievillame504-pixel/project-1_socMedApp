import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  LayoutChangeEvent,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

const PROFILE_PIC = require("../../assets/profile.jpg");
const POST_PIC = require("../../assets/post.jpg");

type Post = {
  id: string;
  user: string;
  caption: string;
  tags: string;
  music: string;
  likes: string;
  comments: string;
  shares: string;
  image: ImageSourcePropType;
  avatar: ImageSourcePropType;
};

const POSTS: Post[] = [
  {
    id: "1",
    user: "Starboy_andii",
    caption: "Dinner night with the squad, good food and good vibes only.",
    tags: "#starboy #foodie #dinnernight #fyp",
    music: "Espresso - Sabrina Carpenter",
    likes: "25.3k",
    comments: "3456",
    shares: "1256",
    image: POST_PIC,
    avatar: PROFILE_PIC,
  },
  {
    id: "2",
    user: "Starboy_andii",
    caption: "Just me being me today.",
    tags: "#selfie #mood #fyp",
    music: "Die With A Smile - Lady Gaga, Bruno Mars",
    likes: "12.8k",
    comments: "980",
    shares: "432",
    image: PROFILE_PIC,
    avatar: PROFILE_PIC,
  },
  {
    id: "3",
    user: "luna.travels",
    caption: "Sunrise at the lake is unreal.",
    tags: "#travel #sunrise",
    music: "Original sound - luna.travels",
    likes: "128.4k",
    comments: "2314",
    shares: "9801",
    image: { uri: "https://picsum.photos/seed/tiktokvid3/600/1100" },
    avatar: { uri: "https://picsum.photos/seed/person3/120/120" },
  },
  {
    id: "4",
    user: "chef.marco",
    caption: "3-ingredient pasta in 10 minutes.",
    tags: "#cooking #easyrecipe",
    music: "Cooking Beat - Marco",
    likes: "540.2k",
    comments: "8120",
    shares: "31.5k",
    image: { uri: "https://picsum.photos/seed/tiktokvid4/600/1100" },
    avatar: { uri: "https://picsum.photos/seed/person4/120/120" },
  },
  {
    id: "5",
    user: "pixel.paws",
    caption: "My cat vs the vacuum.",
    tags: "#cats #funny",
    music: "Funny Vibes - Pixel",
    likes: "1.2M",
    comments: "24.8k",
    shares: "102k",
    image: { uri: "https://picsum.photos/seed/tiktokvid5/600/1100" },
    avatar: { uri: "https://picsum.photos/seed/person5/120/120" },
  },
];

function ActionItem({
  icon,
  label,
  size,
}: {
  icon: IconName;
  label: string;
  size?: number;
}) {
  return (
    <View style={styles.actionItem}>
      <Ionicons name={icon} size={size || 40} color="#fff" />
      <Text style={styles.actionLabel}>{label}</Text>
    </View>
  );
}

function VideoItem({ item, height }: { item: Post; height: number }) {
  return (
    <View style={[styles.post, { height: height }]}>
      <Image source={item.image} style={styles.fill} resizeMode="cover" />
      <View style={styles.shadeBottom} pointerEvents="none" />

      <View style={styles.actions} pointerEvents="none">
        <View style={styles.avatarWrap}>
          <Image source={item.avatar} style={styles.avatar} />
          <View style={styles.followBadge}>
            <Ionicons name="add" size={18} color="#fff" />
          </View>
        </View>
        <ActionItem icon="heart" label={item.likes} size={44} />
        <ActionItem
          icon="chatbubble-ellipses"
          label={item.comments}
          size={40}
        />
        <ActionItem icon="arrow-redo" label={item.shares} size={40} />
        <View style={styles.discRow}>
          <View style={styles.notes}>
            <Ionicons
              name="musical-note"
              size={12}
              color="#fff"
              style={styles.noteSmall}
            />
            <Ionicons name="musical-notes" size={14} color="#fff" />
          </View>
          <View style={styles.disc}>
            <Image source={item.avatar} style={styles.discImage} />
          </View>
        </View>
      </View>

      <View style={styles.info} pointerEvents="none">
        <Text style={styles.username}>{"@" + item.user}</Text>
        <Text style={styles.caption} numberOfLines={3}>
          {item.caption + " "}
          <Text style={styles.tags}>{item.tags}</Text>
        </Text>
        <View style={styles.musicRow}>
          <Ionicons name="musical-notes-outline" size={18} color="#fff" />
          <Text style={styles.music} numberOfLines={1}>
            {"  " + item.music}
          </Text>
        </View>
      </View>
    </View>
  );
}

function TopBar({ top }: { top: number }) {
  return (
    <View style={[styles.topBar, { top: top + 10 }]} pointerEvents="none">
      <View>
        <Text style={styles.topMuted}>Following</Text>
        <View style={styles.redDot} />
      </View>
      <View style={styles.topDivider} />
      <Text style={styles.topActive}>For You</Text>
      <View style={styles.settingsIcon}>
        <Ionicons name="settings-outline" size={26} color="#fff" />
      </View>
    </View>
  );
}

function Tab({
  icon,
  label,
  active,
  badge,
}: {
  icon: IconName;
  label: string;
  active?: boolean;
  badge?: string;
}) {
  return (
    <View style={styles.tab}>
      <View>
        <Ionicons
          name={icon}
          size={28}
          color={active ? "#fff" : "rgba(255,255,255,0.65)"}
        />
        {badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
      </View>
      <Text style={[styles.tabLabel, active ? styles.tabLabelActive : null]}>
        {label}
      </Text>
    </View>
  );
}

function BottomBar({ bottom }: { bottom: number }) {
  return (
    <View
      style={[styles.bottomBar, { paddingBottom: bottom + 4 }]}
      pointerEvents="none"
    >
      <Tab icon="home" label="Home" active />
      <Tab icon="search-outline" label="Discover" />
      <View style={styles.plusSlot}>
        <View style={styles.plusWrap}>
          <View style={styles.plusLeft} />
          <View style={styles.plusRight} />
          <View style={styles.plusBody}>
            <Ionicons name="add" size={28} color="#000" />
          </View>
        </View>
      </View>
      <Tab icon="chatbox-ellipses-outline" label="Inbox" badge="9" />
      <Tab icon="person-outline" label="Profile" />
    </View>
  );
}

export default function Index() {
  const insets = useSafeAreaInsets();
  const [feedHeight, setFeedHeight] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => {
    setFeedHeight(e.nativeEvent.layout.height);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.feed} onLayout={onLayout}>
        {feedHeight > 0 && (
          <FlatList
            data={POSTS}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => (
              <VideoItem item={item} height={feedHeight} />
            )}
            pagingEnabled
            snapToInterval={feedHeight}
            snapToAlignment="start"
            decelerationRate="fast"
            disableIntervalMomentum
            showsVerticalScrollIndicator={false}
            getItemLayout={(_: unknown, index: number) => ({
              length: feedHeight,
              offset: feedHeight * index,
              index: index,
            })}
          />
        )}
        <TopBar top={insets.top} />
      </View>

      <BottomBar bottom={insets.bottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  feed: { flex: 1 },
  post: { width: "100%", backgroundColor: "#111", justifyContent: "flex-end" },
  fill: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  shadeBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 240,
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  topBar: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  topMuted: { color: "rgba(255,255,255,0.7)", fontSize: 18, fontWeight: "600" },
  redDot: {
    position: "absolute",
    top: -2,
    right: -8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fe2c55",
  },
  topDivider: {
    width: 1,
    height: 14,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginHorizontal: 16,
  },
  topActive: { color: "#fff", fontSize: 18, fontWeight: "700" },
  settingsIcon: { position: "absolute", right: 16, top: -2 },

  actions: {
    position: "absolute",
    right: 8,
    bottom: 14,
    alignItems: "center",
    width: 68,
  },
  avatarWrap: { marginBottom: 30, alignItems: "center" },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#444",
  },
  followBadge: {
    position: "absolute",
    bottom: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fe2c55",
    alignItems: "center",
    justifyContent: "center",
  },
  actionItem: { alignItems: "center", marginBottom: 20 },
  actionLabel: { color: "#fff", fontSize: 13, fontWeight: "600", marginTop: 4 },
  discRow: { flexDirection: "row", alignItems: "flex-end", marginTop: 4 },
  notes: { position: "absolute", left: -22, top: -10, alignItems: "center" },
  noteSmall: { marginBottom: 6, marginRight: 10 },
  disc: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
  },
  discImage: { width: 30, height: 30, borderRadius: 15 },

  info: { position: "absolute", left: 14, right: 90, bottom: 14 },
  username: { color: "#fff", fontSize: 18, fontWeight: "700", marginBottom: 8 },
  caption: { color: "#fff", fontSize: 15, lineHeight: 21, marginBottom: 12 },
  tags: { fontWeight: "700" },
  musicRow: { flexDirection: "row", alignItems: "center" },
  music: { color: "#fff", fontSize: 15, flexShrink: 1 },

  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    paddingTop: 8,
  },
  tab: { flex: 1, alignItems: "center" },
  tabLabel: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 3,
  },
  tabLabelActive: { color: "#fff" },
  badge: {
    position: "absolute",
    top: -6,
    right: -12,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#fe2c55",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  plusSlot: { flex: 1, alignItems: "center" },
  plusWrap: { width: 50, height: 34 },
  plusLeft: {
    position: "absolute",
    left: 0,
    width: 42,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#25f4ee",
  },
  plusRight: {
    position: "absolute",
    right: 0,
    width: 42,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#fe2c55",
  },
  plusBody: {
    position: "absolute",
    left: 4,
    width: 42,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
