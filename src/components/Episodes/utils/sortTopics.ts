import _sortBy from "lodash/sortBy";
import { IEpisodeTopic } from "./../../../types";

export const sortTopics = (topics: IEpisodeTopic[]) => {
  const initSort = _sortBy(topics, "order");
  let finalSort: IEpisodeTopic[] = [];

  for (let i = 0; i < initSort.length; i++) {
    if (initSort[i].isChild === true || finalSort.includes(initSort[i])) {
    } else if (initSort[i].isParent === true) {
      finalSort.push(initSort[i]);

      // eslint-disable-next-line array-callback-return
      initSort.map((topic: IEpisodeTopic) => {
        if (
          String(topic.parentId) === String(initSort[i]._id) &&
          topic.isChild === true &&
          !finalSort.includes(topic)
        ) {
          finalSort.push(topic);
        }
      });
    } else {
      finalSort.push(initSort[i]);
    }
  }

  return finalSort;
};

export const sortAndNumberTopics = (topics: IEpisodeTopic[]) => {
  let finalSort: IEpisodeTopic[] = [];
  const initSort = topics;

  for (let i = 0; i < initSort.length; i++) {
    if (initSort[i].isChild === true || finalSort.includes(initSort[i])) {
    } else if (initSort[i].isParent === true) {
      finalSort.push(initSort[i]);

      // eslint-disable-next-line array-callback-return
      const childFilter = initSort.filter(
        topic =>
          topic.parentId === initSort[i]._id &&
          topic.isChild === true &&
          !finalSort.includes(topic)
      );

      finalSort.push(...childFilter);
    } else {
      finalSort.push(initSort[i]);
    }
  }

  for (let i = 0; i < finalSort.length; i++) {
    finalSort[i].order = i + 1;
  }

  return finalSort;
};
