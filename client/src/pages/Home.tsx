import {
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

interface RootMessage {
  message: string;
}

const cardStyle = {
  width: "500px",
  color: "white",
  textAlign: "center",
  padding: "16px",
  borderRadius: "14px",
  margin: "0 auto",
  marginTop: "50px",
};

const Home = () => {
  //business logic
  const { data, isLoading, error } = useQuery<RootMessage>({
    queryKey: ["rootMessage"],
    queryFn: () =>
      fetch(`${API_URL}`, { cache: "no-store" }).then((res) => res.json()),
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
            alignItems: "center", // centers horizontally
            justifyContent: "center", // centers vertically
            gap: "20px",
            textAlign: "center", // ensures text inside <p> is centered
          }}
        >
          {/* Welcome message */}
          {isLoading && <h1>Loading...</h1>}
          {error && <h1>Could not reach server.</h1>}
          <h1>{data?.message}</h1>
          <h2>Choose what you want to get started:</h2>

          <IonCard
            button
            style={{ ...cardStyle, background: "#2D1E3B" }}
            routerLink="/creategame"
          >
            <h4>Create A New Game Room</h4>
          </IonCard>

          <IonCard button style={{ ...cardStyle, background: "#4C2A85" }}>
            <h4>See what game rooms already exist.</h4>
          </IonCard>

          <IonCard button style={{ ...cardStyle, background: "#C72C86" }}>
            <h4>Access specific game code.</h4>
          </IonCard>

          <IonCard button style={{ ...cardStyle, background: "#1B1F3B" }}>
            <h4>Post answer to a specific roomCode.</h4>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
