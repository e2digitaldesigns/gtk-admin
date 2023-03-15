import _sortBy from "lodash/sortBy";
import { IEpisodeTopic } from "./../../../types";

export const sortTopics = (topics: IEpisodeTopic[]) => {
  const initSort: IEpisodeTopic[] = _sortBy(topics, "order");
  let finalSort: IEpisodeTopic[] = [];

  for (let i = 0; i < initSort.length; i++) {
    if (finalSort.includes(initSort[i])) {
    } else if (initSort[i].isParent === true) {
      finalSort.push(initSort[i]);
      let children = initSort.filter(
        f => f.isChild === true && f.parentId === initSort[i]._id
      );

      finalSort = finalSort.concat(children);
    } else {
      finalSort.push(initSort[i]);
    }
  }

  return finalSort;
};
