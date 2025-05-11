import { writable } from 'svelte/store';

// Define types for our gallery items
export interface GalleryItem {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  categories: string[];
}

// Define the tabs for our gallery
export type GalleryTab = 'nature' | 'love' | 'cultural' | 'family';

// Create the initial gallery data using actual content from screenshots
const natureItems: GalleryItem[] = [
  {
    id: 'nature-1',
    title: "Nature's Beauty",
    content: "Nature includes large waterfalls, good beaches, many rivers and beautiful sceneries. Protect and save nature.",
    image: "/images/nature/nature1.jpg",
    date: "Submitted on 9/5/2025",
    categories: ["Abstract", "Classics"]
  },
  {
    id: 'nature-2',
    title: "Nature's Gifts",
    content: "Nature always gives good products, beverages, green farms and medical items for us. Always protect our nature.",
    image: "/images/nature/nature2.jpg",
    date: "Submitted on 7/5/2025",
    categories: ["Action", "Classics"]
  },
  {
    id: 'nature-3',
    title: "Love For Nature",
    content: "Nature and its natural products are greatly loved by our people. Save and protect nature.",
    image: "/images/nature/nature3.jpg",
    date: "Submitted on 6/5/2025",
    categories: ["Abstract", "Fantasy"]
  },
  {
    id: 'nature-4',
    title: "Peaceful Nature",
    content: "Nature and its greenish environment helps us to lead peaceful and happy family life. Happy time admiring nature.",
    image: "/images/nature/nature4.jpg",
    date: "Submitted on 6/5/2025",
    categories: ["Inspirational"]
  }
];

const loveItems: GalleryItem[] = [
  {
    id: 'love-1',
    title: "Shades Of Present Love",
    content: "Celebrate love in all its shades—roses, gifts, tattoos, and memories. Valentine's Day brings lovers...",
    image: "/images/love/love1.jpg",
    date: "Submitted on 14/2/2025",
    categories: ["Abstract", "Action", "Classics"]
  },
  {
    id: 'love-2',
    title: "Love In Digital Age",
    content: "Love in the digital age—calls, chats, and virtual meetings define modern romance. From ice creams t...",
    image: "/images/love/love2.jpg",
    date: "Submitted on 10/2/2025",
    categories: ["Abstract", "Action", "Fantasy"]
  }
];

const culturalItems: GalleryItem[] = [
  {
    id: 'cultural-1',
    title: "New Year In India And New Stories",
    content: "New year in india and new stories of indians, January month begins with new year and includes har...",
    image: "/images/cultural/cultural1.jpg",
    date: "Submitted on 22/12/2024",
    categories: ["Abstract", "Classics", "Fantasy"]
  },
  {
    id: 'cultural-2',
    title: "One Year In Poem In India",
    content: "Celebrate the essence of each month in India, from exams to festivals, and the spirit of unity throu...",
    image: "/images/cultural/cultural2.jpg",
    date: "Submitted on 19/12/2024",
    categories: ["Abstract", "Action", "Classics"]
  },
  {
    id: 'cultural-3',
    title: "Jhansi Rani's Success Story",
    content: "Finally, that location was great to live with for future generations.",
    image: "/images/cultural/cultural3.jpg",
    date: "Submitted on 7/12/2021",
    categories: ["Action", "Fantasy", "Inspirational"]
  }
];

const familyItems: GalleryItem[] = [
  {
    id: 'family-1',
    title: "Dream - Our Child To Be A Doctor",
    content: "Aashritha and Devak preferred their child Yatin to become a professional doctor in Delhi in India.",
    image: "/images/family/family1.jpg",
    date: "Submitted on 8/7/2022",
    categories: ["Classics", "Fantasy", "Children"]
  },
  {
    id: 'family-2',
    title: "Deepa's Marriage",
    content: "There lived Brinda and Kadir in Raipur city. They had a daughter named Deepa. She was a friend of Me...",
    image: "/images/family/family2.jpg",
    date: "Submitted on 1/12/2021",
    categories: ["Classics", "Fantasy", "Children"]
  },
  {
    id: 'family-3',
    title: "Parents Support For Hanita",
    content: "She started practicing this MBBS, practitioner in a goodwill hospital. She was happy along with her ...",
    image: "/images/family/family3.jpg",
    date: "Submitted on 30/11/2021",
    categories: ["Classics", "Fantasy", "Children"]
  }
];

// Create the gallery store
function createGalleryStore() {
  // Initial state
  const initialState = {
    activeTab: 'nature' as GalleryTab,
    items: {
      nature: natureItems,
      love: loveItems,
      cultural: culturalItems,
      family: familyItems
    }
  };
  
  const { subscribe, update } = writable(initialState);
  
  return {
    subscribe,
    setActiveTab: (tab: GalleryTab) => {
      update(state => ({
        ...state,
        activeTab: tab
      }));
    },
    getItemsByTab: (tab: GalleryTab) => {
      return initialState.items[tab];
    }
  };
}

export const galleryStore = createGalleryStore();
