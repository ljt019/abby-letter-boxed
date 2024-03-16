import { Circle } from "@/components/game/circle"; // Ensure this is the correct import path

export default function GameBoard() {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
  const offset = 6; // Half the size of the Circle component (w-12 h-12)

  return (
    <div className="relative p-4">
      <div className="w-64 h-64 border-4 border-black">
        {/* Top row of circles */}
        <div
          className="absolute top-0 left-12 right-0 flex gap-4"
          style={{ marginTop: `-${offset}px` }}
        >
          <Circle className="ml-2">{letters[0]}</Circle>
          <Circle>{letters[1]}</Circle>
          <Circle className="mr-2">{letters[2]}</Circle>
        </div>

        {/* Left column of circles */}
        <div
          className="absolute top-12 bottom-0 left-0 flex flex-col gap-4"
          style={{ marginLeft: `-${offset}px` }}
        >
          <Circle className="mt-2">{letters[3]}</Circle>
          <Circle>{letters[4]}</Circle>
          <Circle className="mb-2">{letters[5]}</Circle>
        </div>

        {/* Right column of circles */}
        <div
          className="absolute top-12 bottom-0 right-0 flex flex-col gap-4"
          style={{ marginRight: `-${offset}px` }}
        >
          <Circle className="mt-2">{letters[6]}</Circle>
          <Circle>{letters[7]}</Circle>
          <Circle className="mb-2">{letters[8]}</Circle>
        </div>

        {/* Bottom row of circles */}
        <div
          className="absolute bottom-0 left-12 right-0 flex gap-4"
          style={{ marginBottom: `-${offset}px` }}
        >
          <Circle className="ml-2">{letters[9]}</Circle>
          <Circle>{letters[10]}</Circle>
          <Circle className="mr-2">{letters[11]}</Circle>
        </div>
      </div>
    </div>
  );
}
