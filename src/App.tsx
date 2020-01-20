import React from "react";
import logo from "./logo.svg";
import "./App.css";

interface ITeam {
  teamId: number;
  teamName: string;
  teamShortName: string;
}

interface IMatch {
  homeScore: number;
  awayScore: number;
  homeId: number;
  awayId: number;
}

function transformMatchResult(
  value: string | null | undefined,
  team1Id: number,
  team2Id: number
): IMatch | undefined {
  if (
    !value ||
    !value.trim() ||
    value.trim() === "a" ||
    value.trim() === "\\n" ||
    value.trim() === "—"
  ) {
    return undefined;
  }
  const [team1Score, team2Score] = value
    .trim()
    .split("–")
    .map(Number);

  return {
    homeScore: team1Score,
    awayScore: team2Score,
    homeId: team1Id,
    awayId: team2Id
  };
}

const App: React.FC = () => {
  React.useEffect(() => {
    const url = `https://en.wikipedia.org/w/api.php?action=parse&page=2019–20_Premier_League&prop=text&section=6&format=json&origin=*`;
    fetch(url, { mode: "cors" })
      .then(res => res.json())
      .then(res => {
        const teams: ITeam[] = [];
        const matches: IMatch[] = [];

        console.log(res.parse.text["*"]);
        let domParser = new DOMParser();
        const doc = domParser.parseFromString(res.parse.text["*"], "text/xml");
        console.dir(doc);
        const table = doc.querySelector("table");
        table?.querySelectorAll("tr").forEach((tr, index) => {
          if (index === 0) {
            // Parse header row -> extract teams
            const anchors = tr.querySelectorAll("a");
            anchors.forEach((anchor, index) => {
              const team: ITeam = {
                teamName:
                  anchor
                    .getAttribute("title")
                    ?.replace("A.F.C.", "")
                    ?.replace("F.C.", "")
                    .trim() ?? "",
                teamId: index,
                teamShortName: anchor.innerHTML
              };
              teams.push(team);
            });
          } else {
            // parse non-header row -> extract match;
            const cells = tr.querySelectorAll("td");
            cells.forEach((cell, innerIndex) => {
              const child = cell.firstChild;
              let result: IMatch | undefined;

              if (child?.lastChild) {
                result = transformMatchResult(
                  child.lastChild?.nodeValue,
                  index - 1,
                  innerIndex
                );
              } else {
                result = transformMatchResult(
                  child?.nodeValue,
                  index - 1,
                  innerIndex
                );
              }

              if (result) {
                matches.push(result);
              }
            });
          }
        });

        console.log(matches);
      });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Suhhhhhhhh
        </a>
      </header>
    </div>
  );
};

export default App;
