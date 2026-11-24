import { Image, type ImageSource } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HomeColors as colors } from '@/constants/theme';

const gutter = 24;
const categoryGap = 8;
const contentMaxWidth = 520;

const photos = {
  mountain: require('@/assets/images/home/mountain.jpg'),
  waterfall: require('@/assets/images/home/waterfall.jpg'),
  beach: require('@/assets/images/home/beach.jpg'),
  forest: require('@/assets/images/home/forest.jpg'),
} satisfies Record<string, ImageSource | number>;

const featuredDestination = {
  title: 'Header',
  description:
    'The tourism products and services offered in the Municipality of Santo Tomas may be divided into three main categories: food and accommodation, nature and leisure, and inland resorts.',
  image: photos.mountain,
};

const categories = [
  { name: 'Adventure', image: photos.waterfall, selected: true },
  { name: 'Nature', image: photos.mountain },
  { name: 'Resorts', image: photos.beach },
  { name: 'Food & Stay', image: photos.forest },
];

const popularPlaces = [
  { id: 'waterfall', image: photos.waterfall },
  { id: 'beach', image: photos.beach },
  { id: 'forest', image: photos.forest },
].map((place) => ({
  ...place,
  name: 'Place Name',
  location: 'Place Location',
  description: 'Place Descriptions Place Descriptions Place Descriptions',
}));

export default function Home() {
  const [contentWidth, setContentWidth] = useState(0);
  const categoryWidth = Math.max(74, (contentWidth - 3 * categoryGap) / categories.length);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <HomeHeader />
          <View>
            <FeaturedDestinationCard />
            <View
              accessible
              accessibilityLabel="Featured destination 1 of 3"
              style={styles.indicators}>
              <View style={[styles.dot, styles.activeDot]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
          <View style={styles.section}>
            <Text accessibilityRole="header" style={styles.sectionTitle}>Categories</Text>
            <ScrollView
              horizontal
              onLayout={({ nativeEvent }) => setContentWidth(nativeEvent.layout.width)}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categories}>
              {categories.map((category) => (
                <CategoryCard key={category.name} category={category} width={categoryWidth} />
              ))}
            </ScrollView>
          </View>
          <View style={styles.section}>
            <Text accessibilityRole="header" style={styles.sectionTitle}>Popular Places</Text>
            {popularPlaces.map((place) => (
              <PopularPlaceCard key={place.id} place={place} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function HomeHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.greeting}>Madayaw nga Adlaw, User!</Text>
      <View style={styles.headingRow}>
        <Text accessibilityRole="header" style={styles.heading}>Where do you want to go?</Text>
        <Pressable disabled accessibilityRole="button" style={styles.budget}>
          <Text style={styles.buttonText}>+ Budget</Text>
        </Pressable>
      </View>
    </View>
  );
}

function FeaturedDestinationCard() {
  return (
    <View style={styles.featuredCard}>
      <Image source={featuredDestination.image} contentFit="cover" style={styles.featuredImage} />
      <View style={styles.featuredText}>
        <Text style={styles.featuredTitle}>{featuredDestination.title}</Text>
        <Text style={styles.description}>{featuredDestination.description}</Text>
        <Pressable disabled accessibilityRole="button" style={styles.details}>
          <Text style={styles.buttonText}>Details</Text>
          <SymbolView name={{ ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' }}
            size={17} tintColor={colors.text} />
        </Pressable>
      </View>
    </View>
  );
}

function CategoryCard({ category, width }: { category: (typeof categories)[number]; width: number }) {
  return (
    <View
      accessible
      accessibilityState={{ selected: category.selected ?? false }}
      style={[styles.categoryCard, { width }, category.selected && styles.selectedCategory]}>
      <Image source={category.image} contentFit="cover" style={styles.categoryImage} />
      <View style={styles.categoryCaption}>
        <Text style={[styles.categoryLabel, category.selected && styles.selectedCategoryLabel]}>
          {category.name}
        </Text>
      </View>
    </View>
  );
}

function PopularPlaceCard({ place }: { place: (typeof popularPlaces)[number] }) {
  return (
    <View style={styles.popularCard}>
      <Image source={place.image} contentFit="cover" style={styles.popularImage} />
      <View style={styles.popularText}>
        <View style={styles.placeHeader}>
          <View style={styles.placeNameGroup}>
            <Text style={styles.placeTitle}>{place.name}</Text>
            <View style={styles.location}>
              <SymbolView name={{ ios: 'mappin.circle', android: 'location_on', web: 'location_on' }}
                size={14} tintColor={colors.secondary} />
              <Text style={styles.locationText}>{place.location}</Text>
            </View>
          </View>
          <Pressable disabled accessibilityRole="button" accessibilityLabel={`Favorite ${place.name}`}
            style={styles.favorite}>
            <SymbolView name={{ ios: 'heart', android: 'favorite', web: 'favorite' }}
              size={19} tintColor={colors.secondary} />
          </Pressable>
        </View>
        <Text numberOfLines={2} style={styles.description}>{place.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingTop: 18, paddingBottom: 40 },
  content: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: contentMaxWidth,
    paddingHorizontal: gutter,
    gap: 22,
  },
  header: { marginBottom: 2, gap: 3 },
  greeting: { color: colors.secondary, fontFamily: 'Montserrat-Regular', fontSize: 11 },
  headingRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  heading: { flex: 1, color: colors.text, fontFamily: 'Montserrat-Bold', fontSize: 16 },
  budget: {
    paddingHorizontal: 15,
    minHeight: 32,
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: 24,
  },
  buttonText: { color: colors.text, fontFamily: 'Montserrat-SemiBold', fontSize: 11 },
  featuredCard: {
    flexDirection: 'row',
    gap: 14,
    padding: 14,
    borderRadius: 22,
    backgroundColor: colors.card,
    minHeight: 194,
  },
  featuredImage: { width: '32%', borderRadius: 12, backgroundColor: colors.background },
  featuredText: { flex: 1, alignItems: 'flex-start', gap: 8, paddingTop: 2 },
  featuredTitle: { color: colors.text, fontFamily: 'Montserrat-Bold', fontSize: 19 },
  description: { color: colors.secondary, fontFamily: 'Montserrat-Regular', fontSize: 11, lineHeight: 15 },
  details: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.orange,
    borderRadius: 22,
    paddingHorizontal: 16,
    minHeight: 34,
    marginTop: 'auto',
  },
  indicators: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 7, marginTop: 15 },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.dot },
  activeDot: { width: 22, backgroundColor: colors.orange },
  section: { gap: 12 },
  sectionTitle: { color: colors.text, fontFamily: 'Montserrat-Bold', fontSize: 18, marginBottom: 3 },
  categories: { gap: categoryGap },
  categoryCard: { padding: 5, borderRadius: 16, backgroundColor: colors.card },
  selectedCategory: { backgroundColor: colors.olive },
  categoryImage: { width: '100%', aspectRatio: 1, borderRadius: 11, backgroundColor: colors.background },
  categoryCaption: { flex: 1, justifyContent: 'center', minHeight: 28, paddingVertical: 4 },
  categoryLabel: { color: colors.text, fontFamily: 'Montserrat-Medium', fontSize: 10, textAlign: 'center' },
  selectedCategoryLabel: { color: '#FFFFFF' },
  popularCard: { flexDirection: 'row', gap: 13, padding: 10, borderRadius: 19, backgroundColor: colors.card },
  popularImage: { width: '31%', aspectRatio: 0.94, borderRadius: 12, backgroundColor: colors.background },
  popularText: { flex: 1, paddingVertical: 2, gap: 11 },
  placeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 4 },
  placeNameGroup: { flex: 1, gap: 4, paddingTop: 3 },
  placeTitle: { color: colors.text, fontFamily: 'Montserrat-SemiBold', fontSize: 14 },
  location: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  locationText: { flexShrink: 1, color: colors.secondary, fontFamily: 'Montserrat-Regular', fontSize: 10 },
  favorite: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#EEEFEB', alignItems: 'center', justifyContent: 'center' },
});
