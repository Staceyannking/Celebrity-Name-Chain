// @ts-nocheck
import {
  IonPage,
  IonInput,
  IonContent,
  IonButton,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
const API_URL = "http://localhost:3000/currentGames";
interface Game {
  roomCode: string;
  celebrityName: string;
}

const RetrievedGames = () => {
  const { data, isLoading, error } = useQuery<Game[]>({
    queryKey: ["roomCode"],
    queryFn: () =>
      fetch(API_URL, { cache: "no-store" }).then((res) => res.json()),
    refetchInterval: 10000,
  });

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle class="ion-text-center">
              Stacey | Prayash | Yasmine
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent
          fullscreen
          className="ion-padding"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            textAlign: "center",
          }}
        >
          {isLoading && <p> loading.....</p>}

          {error && <p> couldn't reach the server</p>}
          <h3>These are our current games:</h3>
          <br />
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IonList style={{ width: "500px" }}>
              {data?.gamesRecords.map((game) => (
                <IonItem
                  key={game.roomCode}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    textAlign: "left",
                  }}
                >
                  <IonLabel>
                    <strong>{game.roomCode}</strong> — {game.celebrityName}
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </div>
          <br />
          <IonButton color="warning" routerLink="/">
            Back To Home Page
          </IonButton>
        </IonContent>
      </IonPage>
    </>
  );
};
export default RetrievedGames;
