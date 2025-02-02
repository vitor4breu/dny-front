import { FC, useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import { create } from "zustand";

// Define the state type
type MyStoreState = {
  variable1: string;
  setVariable1: (value : any) => void;
  variable2: number;
  incremenetVariable2: () => void;
};

// Create the Zustand store
const useMyStore = create<MyStoreState>((set) => ({
  variable1: "",
  setVariable1: (value : any) => set((state) => ({ variable1: value })),
  variable2: 0,
  incremenetVariable2: () =>
    set((state) => ({ variable2: state.variable2 + 1 })),
}));

export default useMyStore;




const RerenderCounter: React.FC = () => {
    // Start with -1 so that on first render, the count is 0 and the text reads "has re-rendered 0 times"
    const rerenderCountRef = useRef(-1);

    // Increment the counter whenever the component re-renders
    useEffect(() => {
        rerenderCountRef.current += 1;
    });

    return (
        <div>
            <p>Component has re-rendered {rerenderCountRef.current > 0 ? rerenderCountRef.current : 0} times.</p>
        </div>
    );
};

export const ComponentUsingZustandStore: FC = () => {
  return (
    <div>
      <h2>Using Zustand</h2>
      <UpdatingComponent />
      <ShouldUpdateWhenButtonPressed />
      <ShouldNotUpdate />
    </div>
  );
};

const UpdatingComponent: FC = () => {
  const { variable2, updateVariable } = useMyStore((state) => ({
    variable2: state.variable2,
    updateVariable: state.incremenetVariable2,
  }));
  return (
    <div>
      <p>count is {variable2}</p>
      <button onClick={updateVariable}>Click to increment!</button>
    </div>
  );
};

const ShouldUpdateWhenButtonPressed: FC = () => {
  const variable2 = useMyStore((state) => state.variable2);
  return (
    <div style={{ backgroundColor: "grey" }}>
      <h3>his should update on click! {variable2}</h3>
      <RerenderCounter />
    </div>
  );
};

const ShouldNotUpdate: FC = () => {
  const variable1 = useMyStore((state) => state.variable1);
  const setVariable1 = useMyStore((state) => state.setVariable1);

  return (
    <div style={{ backgroundColor: "brown" }}>
      <h3>This should NOT update, and won't when using Zustand {variable1}</h3>
      <input value={variable1} onChange={(e) => setVariable1(e.target.value)} />
      <RerenderCounter />
    </div>
  );
};
