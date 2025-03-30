export interface Photo {
  id: number;
  url: string;
  thumb: string;
  title: string;
  tags: string[];
}

export const photos: Photo[] = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg",
    thumb: "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Горный пейзаж",
    tags: ["природа", "горы", "пейзаж"]
  },
  {
    id: 2,
    url: "https://images.pexels.com/photos/15286/pexels-photo.jpg",
    thumb: "https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Лесной ручей",
    tags: ["природа", "лес", "вода"]
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/1257860/pexels-photo-1257860.jpeg",
    thumb: "https://images.pexels.com/photos/1257860/pexels-photo-1257860.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Город ночью",
    tags: ["город", "ночь", "архитектура"]
  },
  {
    id: 4,
    url: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg",
    thumb: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Океанский закат",
    tags: ["океан", "закат", "пляж"]
  },
  {
    id: 5,
    url: "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg",
    thumb: "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Северное сияние",
    tags: ["природа", "ночь", "небо"]
  },
  {
    id: 6,
    url: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg",
    thumb: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Озеро в горах",
    tags: ["озеро", "горы", "отражение"]
  }
];