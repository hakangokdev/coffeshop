import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Svg, { Path, Mask, G } from 'react-native-svg';

// Home SVG Icon Component
const HomeIcon = ({ size = 24, color = '#000' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Mask id="mask0_418_851" maskUnits="userSpaceOnUse" x="2" y="1" width="21" height="22">
      <Path fillRule="evenodd" clipRule="evenodd" d="M2 1.00021H22.4998V22.5052H2V1.00021Z" fill="white"/>
    </Mask>
    <G mask="url(#mask0_418_851)">
      <Path fillRule="evenodd" clipRule="evenodd" d="M13.7168 15.2913C14.9208 15.2913 15.9008 16.2643 15.9008 17.4603V20.5363C15.9008 20.7933 16.1068 20.9993 16.3708 21.0053H18.2768C19.7788 21.0053 20.9998 19.7993 20.9998 18.3173V9.59331C20.9928 9.08331 20.7498 8.60331 20.3328 8.28431L13.7398 3.02631C12.8548 2.32531 11.6168 2.32531 10.7288 3.02831L4.1808 8.28231C3.7478 8.61131 3.5048 9.09131 3.4998 9.61031V18.3173C3.4998 19.7993 4.7208 21.0053 6.2228 21.0053H8.1468C8.4178 21.0053 8.6378 20.7903 8.6378 20.5263C8.6378 20.4683 8.6448 20.4103 8.6568 20.3553V17.4603C8.6568 16.2713 9.6308 15.2993 10.8258 15.2913H13.7168ZM18.2768 22.5053H16.3528C15.2508 22.4793 14.4008 21.6143 14.4008 20.5363V17.4603C14.4008 17.0913 14.0938 16.7913 13.7168 16.7913H10.8308C10.4618 16.7933 10.1568 17.0943 10.1568 17.4603V20.5263C10.1568 20.6013 10.1468 20.6733 10.1258 20.7413C10.0178 21.7313 9.1718 22.5053 8.1468 22.5053H6.2228C3.8938 22.5053 1.9998 20.6263 1.9998 18.3173V9.60331C2.0098 8.60931 2.4678 7.69931 3.2588 7.10031L9.7938 1.85531C11.2328 0.715311 13.2378 0.715311 14.6738 1.85331L21.2558 7.10331C22.0288 7.69231 22.4868 8.60031 22.4998 9.58231V18.3173C22.4998 20.6263 20.6058 22.5053 18.2768 22.5053Z" fill={color}/>
    </G>
  </Svg>
);

// Heart SVG Icon Component
const HeartIcon = ({ size = 24, color = '#000' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Mask id="mask0_418_846" maskUnits="userSpaceOnUse" x="2" y="3" width="21" height="20">
      <Path fillRule="evenodd" clipRule="evenodd" d="M2 2.99991H22.4725V22.5009H2V2.99991Z" fill="white"/>
    </Mask>
    <G mask="url(#mask0_418_846)">
      <Path fillRule="evenodd" clipRule="evenodd" d="M3.82371 12.123C5.22571 16.485 10.7647 20.012 12.2367 20.885C13.7137 20.003 19.2927 16.437 20.6497 12.127C21.5407 9.341 20.7137 5.812 17.4277 4.753C15.8357 4.242 13.9787 4.553 12.6967 5.545C12.4287 5.751 12.0567 5.755 11.7867 5.551C10.4287 4.53 8.65471 4.231 7.03771 4.753C3.75671 5.811 2.93271 9.34 3.82371 12.123ZM12.2377 22.501C12.1137 22.501 11.9907 22.471 11.8787 22.41C11.5657 22.239 4.19271 18.175 2.39571 12.581C2.39471 12.581 2.39471 12.58 2.39471 12.58C1.26671 9.058 2.52271 4.632 6.57771 3.325C8.48171 2.709 10.5567 2.98 12.2347 4.039C13.8607 3.011 16.0207 2.727 17.8867 3.325C21.9457 4.634 23.2057 9.059 22.0787 12.58C20.3397 18.11 12.9127 22.235 12.5977 22.408C12.4857 22.47 12.3617 22.501 12.2377 22.501Z" fill={color}/>
    </G>
    <Path fillRule="evenodd" clipRule="evenodd" d="M18.1537 10.6249C17.7667 10.6249 17.4387 10.3279 17.4067 9.9359C17.3407 9.1139 16.7907 8.4199 16.0077 8.1669C15.6127 8.0389 15.3967 7.6159 15.5237 7.2229C15.6527 6.8289 16.0717 6.6149 16.4677 6.7389C17.8307 7.1799 18.7857 8.3869 18.9027 9.8139C18.9357 10.2269 18.6287 10.5889 18.2157 10.6219C18.1947 10.6239 18.1747 10.6249 18.1537 10.6249Z" fill={color}/>
  </Svg>
);

// Bag SVG Icon Component
const BagIcon = ({ size = 24, color = '#000' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Mask id="mask0_418_848" maskUnits="userSpaceOnUse" x="2" y="6" width="20" height="17">
      <Path fillRule="evenodd" clipRule="evenodd" d="M2 6.5401H21.5859V22.7217H2V6.5401Z" fill="white"/>
    </Mask>
    <G mask="url(#mask0_418_848)">
      <Path fillRule="evenodd" clipRule="evenodd" d="M6.7155 8.0401C6.2745 8.0401 4.8005 8.2181 4.3775 10.5021L3.6055 16.5021C3.3545 18.1851 3.5485 19.4031 4.1835 20.1401C4.8105 20.8681 5.9325 21.2221 7.6125 21.2221H15.9605C17.0085 21.2221 18.4395 21.0131 19.3035 20.0151C19.9895 19.2241 20.2255 18.0461 20.0055 16.5131L19.2265 10.4611C18.8945 8.9701 18.0185 8.0401 16.8945 8.0401H6.7155ZM15.9605 22.7221H7.6125C5.4695 22.7221 3.9765 22.1971 3.0475 21.1181C2.1145 20.0361 1.8025 18.4131 2.1205 16.2951L2.8965 10.2691C3.4065 7.5061 5.2715 6.5401 6.7155 6.5401H16.8945C18.3445 6.5401 20.1075 7.5031 20.7025 10.2041L21.4915 16.3111C21.7745 18.2821 21.4205 19.8631 20.4375 20.9971C19.4595 22.1251 17.9115 22.7221 15.9605 22.7221Z" fill={color}/>
    </G>
    <Path fillRule="evenodd" clipRule="evenodd" d="M16.0978 7.82031C15.6838 7.82031 15.3478 7.48431 15.3478 7.07031C15.3478 5.10131 13.7458 3.50031 11.7778 3.50031H11.7628C10.8218 3.50031 9.90481 3.87931 9.23981 4.54031C8.57181 5.20531 8.18881 6.12831 8.18881 7.07031C8.18881 7.48431 7.85281 7.82031 7.43881 7.82031C7.02481 7.82031 6.68881 7.48431 6.68881 7.07031C6.68881 5.73131 7.23281 4.42231 8.18081 3.47731C9.12581 2.53831 10.4288 2.00031 11.7598 2.00031H11.7808C14.5738 2.00031 16.8478 4.27431 16.8478 7.07031C16.8478 7.48431 16.5118 7.82031 16.0978 7.82031Z" fill={color}/>
    <Path fillRule="evenodd" clipRule="evenodd" d="M14.7433 12.3242H14.6973C14.2833 12.3242 13.9473 11.9882 13.9473 11.5742C13.9473 11.1602 14.2833 10.8242 14.6973 10.8242C15.1113 10.8242 15.4703 11.1602 15.4703 11.5742C15.4703 11.9882 15.1573 12.3242 14.7433 12.3242Z" fill={color}/>
    <Path fillRule="evenodd" clipRule="evenodd" d="M8.91219 12.3242H8.86719C8.45319 12.3242 8.11719 11.9882 8.11719 11.5742C8.11719 11.1602 8.45319 10.8242 8.86719 10.8242C9.28119 10.8242 9.64019 11.1602 9.64019 11.5742C9.64019 11.9882 9.32619 12.3242 8.91219 12.3242Z" fill={color}/>
  </Svg>
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#C67C4E',
        tabBarInactiveTintColor: '#A2A2A2',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E3E3E3',
        },
        tabBarLabelStyle: {
          fontFamily: 'Sora',
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color, size }) => (
            <HomeIcon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menü',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="restaurant-menu" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <HeartIcon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Sepet',
          tabBarIcon: ({ color, size }) => (
            <BagIcon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
} 