import { Card, CardContent } from "@/components/ui/card";
import GameBoard from "@/components/game/gameboard";

function App() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card>
        <CardContent className="flex items-center justify-center h-full p-8">
          <div className="relative w-full h-full">
            <GameBoard />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
