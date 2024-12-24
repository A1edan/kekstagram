const ZERO = 0;
const MIN_NUMBER = 1;
const MAX_NUMBER = 25;
const MAX_AVATAR_NUMBER = 6;
const MAX_COMMENTS_COUNT = 30;
const MIN_NUMBER_LIKES = 15;
const MAX_NUMBER_LIKES = 200;
const MAX_NUMBER_COMMENTS = 5;
const MAX_COUNT_COMMENTS = 2;

const LIST_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Александр',
  'Светлана',
  'Дмитрий',
  'Елена',
  'Анастасия',
  'Максим',
  'Мария',
  'Иван',
  'Ольга',
  'Николай',
  'Татьяна',
  'Сергей',
  'Анна',
  'Павел',
  'Ксения',
  'Владимир',
  'Юлия',
  'Роман',
  'Екатерина',
  'Артем',
  'Дарья',
  'Игорь',
  'Евгения',
  'Алексей',
  'Кирилл',
];

const getRandomPositiveNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + MIN_NUMBER)) + min;

const getUniqueNumberInRange = (min, max) => {
  const previousValues = [];
  return () => {
    let currentValue = getRandomPositiveNumber(min, max);
    if (previousValues.length >= max - min + MIN_NUMBER) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const generatorUniqueNumbers = getUniqueNumberInRange(MIN_NUMBER, MAX_NUMBER);

const getRandomElementFromArray = (element) => element[getRandomPositiveNumber(ZERO, element.length - MIN_NUMBER)];

const commentsCount = getUniqueNumberInRange(MIN_NUMBER, MAX_COUNT_COMMENTS);

const getRandomCountOfComments = (num) => {
  const randomComment = getUniqueNumberInRange(ZERO, MAX_NUMBER_COMMENTS);
  const result = [];
  switch (num) {
    case 1:
      result.push(LIST_COMMENTS[randomComment()]);
      return result.join(' ');
    case 2:
      result.push(LIST_COMMENTS[randomComment()]);
      result.push(LIST_COMMENTS[randomComment()]);
      return result.join(' ');
    default:
      return null;
  }
};

const getDataСomment = () => ({
  id: getRandomPositiveNumber(MIN_NUMBER, MAX_NUMBER),
  avatar: `img/avatar-${getRandomPositiveNumber(MIN_NUMBER, MAX_AVATAR_NUMBER)}.svg`,
  message: getRandomCountOfComments(commentsCount()),
  name: getRandomElementFromArray(NAMES),
});

const getNextNumber = (start = MIN_NUMBER) => () => start++;

const counter = getNextNumber(MIN_NUMBER);

const dataGenerates = (arrayCount, data) => Array.from({ length: arrayCount }, data);

const getPhotoData = () => ({
  id: counter(),
  url: `photos/${generatorUniqueNumbers()}.jpg`,
  description:
    'На фотографии изображен живописный осенний пейзаж: тропинка, устланная золотыми листьями, старый дуб с мощными ветвями и яркое небо, окрашенное в теплые оттенки заката, создающее атмосферу спокойствия и уединения.',
  likes: getRandomPositiveNumber(MIN_NUMBER_LIKES, MAX_NUMBER_LIKES),
  comments: dataGenerates(getRandomPositiveNumber(ZERO, MAX_COMMENTS_COUNT), getDataСomment),
});

dataGenerates(MAX_NUMBER, getPhotoData);
