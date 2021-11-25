import React, { createContext, useContext, useReducer } from "react";

const tagStore = createContext<[Tag[], React.Dispatch<{
  type: "update";
  payload: Tag[];
}>]>([[], () => { }]);

function reducer(state: Tag[], action: {
  type: "update",
  payload: Tag[]
}) {
  switch (action.type) {
    case "update": return [...state, ...action.payload]
    default: return state
  }
}

const TagProvider: React.FC<{
  tags: Tag[];
}> = ({ tags, children }) => {

  const [state, dispatch] = useReducer(reducer, tags)
  return <tagStore.Provider value={[state, dispatch]}>{children}</tagStore.Provider>;
};

export const useTags = (): [Map<number, string>, React.Dispatch<{
  type: "update";
  payload: Tag[];
}>, Tag[]] => {
  const [state, dispatch] = useContext(tagStore)

  const tagMap: Map<number, string> = new Map()
  state.forEach(({ Id, Text }) => {
    tagMap.set(Id, Text)
  })
  return [tagMap, dispatch, state]
}

export default TagProvider;
export { tagStore };

