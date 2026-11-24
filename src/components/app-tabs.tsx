import { usePathname } from 'expo-router';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeColors as colors } from '@/constants/theme';

const tabs = [
  { label: 'Home', name: 'home', href: '/', icon: { ios: 'house', android: 'home', web: 'home' } },
  { label: 'Category', name: 'category', href: '/explore', icon: { ios: 'square.grid.2x2', android: 'grid_view', web: 'grid_view' } },
  { label: 'Map', icon: { ios: 'map', android: 'map', web: 'map' } },
  { label: 'Trips', icon: { ios: 'suitcase', android: 'luggage', web: 'luggage' } },
  { label: 'Profile', icon: { ios: 'person', android: 'person', web: 'person' } },
] as const;

export default function AppTabs() {
  const pathname = usePathname();
  const { bottom, left, right } = useSafeAreaInsets();

  return (
    <Tabs style={styles.tabs}>
      <TabSlot style={styles.slot} />
      <View style={[styles.bar, {
        paddingBottom: Math.max(bottom, 12),
        paddingLeft: Math.max(left, 8),
        paddingRight: Math.max(right, 8),
      }]}>
        <View style={styles.tabRow} accessibilityRole="tablist">
          {tabs.map((tab) => {
            if ('href' in tab) {
              const selected = pathname === tab.href;

              return (
                <TabTrigger
                  key={tab.name}
                  name={tab.name}
                  accessibilityRole="tab"
                  accessibilityState={{ selected }}
                  style={styles.tab}>
                  <TabLabel label={tab.label} icon={tab.icon} selected={selected} />
                </TabTrigger>
              );
            }

            return (
              <View
                key={tab.label}
                accessible
                accessibilityRole="tab"
                accessibilityLabel={tab.label}
                accessibilityState={{ disabled: true }}
                style={styles.tab}>
                <TabLabel label={tab.label} icon={tab.icon} />
              </View>
            );
          })}
        </View>
      </View>
      <TabList style={styles.routeList}>
        <TabTrigger name="home" href="/" />
        <TabTrigger name="category" href="/explore" />
      </TabList>
    </Tabs>
  );
}

function TabLabel({ label, icon, selected = false }: {
  label: string;
  icon: SymbolViewProps['name'];
  selected?: boolean;
}) {
  return (
    <>
      <View style={[styles.iconPill, selected && styles.selectedPill]}>
        <SymbolView name={icon} size={21} tintColor={selected ? '#FFFFFF' : colors.text} />
      </View>
      <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  tabs: { flex: 1, backgroundColor: colors.background },
  slot: { flex: 1 },
  routeList: { display: 'none' },
  bar: {
    flexShrink: 0,
    backgroundColor: colors.card,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 9,
  },
  tabRow: { flexDirection: 'row', width: '100%', maxWidth: 520, alignSelf: 'center' },
  tab: { flex: 1, minWidth: 0, minHeight: 48, alignItems: 'center', gap: 6 },
  iconPill: { width: 46, height: 32, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  selectedPill: { backgroundColor: colors.orange },
  label: { color: colors.secondary, fontFamily: 'Montserrat-Regular', fontSize: 10, textAlign: 'center' },
  selectedLabel: { fontFamily: 'Montserrat-SemiBold' },
});
