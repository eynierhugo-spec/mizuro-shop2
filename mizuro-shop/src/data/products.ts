export type Badge = 'Populaire' | 'Promo' | 'Nouveau' | null

export interface Product {
  id: number
  slug: string
  name: string
  price: number
  originalPrice?: number
  badge: Badge
  emoji: string
  emojiColor?: string
  category: string
  description: string
  features: string[]
  deliveryTime: string
}

export const products: Product[] = [
  {
    id: 1,
    slug: 'mizuro-coins-lifetime',
    name: 'Mizuro Coins Lifetime',
    price: 20.0,
    badge: 'Populaire',
    emoji: '⚔️',
    category: 'Coins',
    description:
      'Obtenez vos Mizuro Coins à vie. Profitez de tous les avantages exclusifs du shop Mizuro sans limite de temps.',
    features: [
      'Accès à vie aux Mizuro Coins',
      'Priorité sur les nouvelles offres',
      'Support prioritaire 24/7',
      'Bonus mensuels inclus',
    ],
    deliveryTime: 'Instantané',
  },
  {
    id: 2,
    slug: 'nitro-boost-1-an',
    name: 'Nitro Boost 1 an',
    price: 72.14,
    badge: 'Populaire',
    emoji: '🚀',
    category: 'Discord',
    description:
      'Discord Nitro complet pour 1 an. Profitez de toutes les fonctionnalités premium : emojis custom, boost serveur, upload 500MB, etc.',
    features: [
      'Discord Nitro complet 12 mois',
      '2 boosts serveur inclus',
      'Upload jusqu\'à 500MB',
      'Emojis et stickers custom',
      'Thème app personnalisé',
    ],
    deliveryTime: 'Instantané',
  },
  {
    id: 3,
    slug: 'deco-discord',
    name: 'Déco Discord',
    price: 1.98,
    originalPrice: 4.99,
    badge: 'Promo',
    emoji: '🎨',
    category: 'Discord',
    description:
      'Décorations de profil Discord exclusives. Personnalisez votre avatar avec des effets visuels uniques.',
    features: [
      'Décorations exclusives',
      'Compatible tous profils',
      'Mise à jour régulière',
      'Support inclus',
    ],
    deliveryTime: 'Instantané',
  },
  {
    id: 4,
    slug: '1000-members',
    name: '1000 Members',
    price: 10.24,
    badge: 'Nouveau',
    emoji: '👥',
    category: 'Discord',
    description:
      'Boostez votre serveur Discord avec 1000 membres réels. Augmentez votre crédibilité et votre communauté rapidement.',
    features: [
      '1000 membres garantis',
      'Membres de qualité',
      'Livraison progressive',
      'Garantie 30 jours',
    ],
    deliveryTime: '24-48h',
  },
  {
    id: 5,
    slug: '5000-follows-twitch',
    name: '5 000 follows Twitch',
    price: 6.5,
    badge: null,
    emoji: '🟣',
    emojiColor: 'purple',
    category: 'Twitch',
    description:
      'Obtenez 5000 followers Twitch réels. Développez votre chaîne et atteignez le statut Affilié plus rapidement.',
    features: [
      '5000 followers réels',
      'Livraison progressive naturelle',
      'Aucun risque de ban',
      'Garantie 30 jours',
    ],
    deliveryTime: '24-72h',
  },
  {
    id: 6,
    slug: 'compte-twitch-10k',
    name: 'Compte Twitch 10k',
    price: 8.1,
    badge: 'Nouveau',
    emoji: '📦',
    category: 'Twitch',
    description:
      'Compte Twitch avec 10 000 followers. Démarrez votre aventure streaming avec une base de fans déjà établie.',
    features: [
      'Compte avec 10k followers',
      'Compte vérifié',
      'Historique de stream',
      'Support inclus',
    ],
    deliveryTime: 'Instantané',
  },
  {
    id: 7,
    slug: 'discord-bot-premium',
    name: 'Discord Bot Premium',
    price: 15.0,
    badge: 'Populaire',
    emoji: '🤖',
    category: 'Bots',
    description:
      'Bot Discord premium avec des fonctionnalités avancées : modération, musique, économie et bien plus encore.',
    features: [
      'Modération automatique',
      'Lecteur de musique HD',
      'Système d\'économie',
      'Commandes personnalisables',
      'Support 24/7',
    ],
    deliveryTime: 'Instantané',
  },
  {
    id: 8,
    slug: 'nitro-boost-3-mois',
    name: 'Nitro Boost 3 mois',
    price: 19.99,
    badge: null,
    emoji: '💎',
    category: 'Discord',
    description:
      'Discord Nitro pour 3 mois. Idéal pour tester toutes les fonctionnalités premium avant de vous engager sur 1 an.',
    features: [
      'Discord Nitro 3 mois',
      '1 boost serveur inclus',
      'Upload jusqu\'à 500MB',
      'Emojis custom',
    ],
    deliveryTime: 'Instantané',
  },
  {
    id: 9,
    slug: '10000-follows-twitch',
    name: '10 000 follows Twitch',
    price: 11.99,
    badge: null,
    emoji: '🎮',
    category: 'Twitch',
    description:
      '10 000 followers Twitch pour propulser votre chaîne. Atteignez le statut Partenaire plus rapidement.',
    features: [
      '10 000 followers réels',
      'Livraison progressive',
      'Aucun risque',
      'Garantie 60 jours',
    ],
    deliveryTime: '48-96h',
  },
  {
    id: 10,
    slug: '5000-members',
    name: '5 000 Members',
    price: 45.0,
    badge: null,
    emoji: '🌟',
    category: 'Discord',
    description:
      '5000 membres pour votre serveur Discord. Créez une communauté active et engagée en un temps record.',
    features: [
      '5000 membres garantis',
      'Membres de qualité',
      'Livraison sur 7 jours',
      'Garantie 60 jours',
    ],
    deliveryTime: '5-7 jours',
  },
  {
    id: 11,
    slug: 'bot-musique-discord',
    name: 'Bot Musique Discord',
    price: 8.99,
    badge: 'Nouveau',
    emoji: '🎵',
    category: 'Bots',
    description:
      'Bot musical Discord haute qualité. Spotify, YouTube, SoundCloud et plus encore directement dans votre serveur.',
    features: [
      'Spotify & YouTube',
      'Audio HD sans coupures',
      'File d\'attente avancée',
      'Commandes slash',
    ],
    deliveryTime: 'Instantané',
  },
  {
    id: 12,
    slug: 'compte-twitch-50k',
    name: 'Compte Twitch 50k',
    price: 35.0,
    badge: null,
    emoji: '🏆',
    category: 'Twitch',
    description:
      'Compte Twitch avec 50 000 followers. La solution idéale pour lancer un stream professionnel immédiatement.',
    features: [
      'Compte avec 50k followers',
      'Statut Affilié inclus',
      'Historique de stream',
      'Transfert sécurisé',
    ],
    deliveryTime: 'Instantané',
  },
]

export const categories = ['Tous', 'Discord', 'Twitch', 'Bots', 'Coins']

export const featuredProducts = products.slice(0, 6)
