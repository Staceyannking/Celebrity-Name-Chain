// @ts-nocheck
import {
  IonPage,
  IonInput,
  IonContent,
  IonButton,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonList,
  IonText,
} from "@ionic/react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const CreateAnswer = () => {
  const [roomCode, setRoomCode] = useState("");
  const [username, setUsername] = useState("");
  const [answer, setAnswer] = useState("");

  const queryClient = useQueryClient();

  // GET answers for this roomCode
  const { data: answersData } = useQuery({
    queryKey: ["answers", roomCode],
    queryFn: async () => {
      if (!roomCode) return [];
      const res = await fetch(`http://localhost:3000/answers/${roomCode}`);
      return res.json();
    },
    enabled: !!roomCode,
  });

  // POST new answer
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`http://localhost:3000/answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomCode, username, answer }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error);
        throw new Error(result.error);
      }

      alert(result.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["answers", roomCode]);
      setAnswer("");
    },
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
          <h3>
            Submit a new answer for your room. Make sure it follows the
            celebrity chain rules!
          </h3>

          <br />

          {/* FORM */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              mutation.mutate();
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              width: "100%",
            }}
          >
            <IonInput
              fill="outline"
              label="Room Code"
              style={{ width: "500px" }}
              value={roomCode}
              onIonChange={(e) => setRoomCode(e.detail.value)}
            />

            <IonInput
              fill="outline"
              label="Username"
              style={{ width: "500px" }}
              value={username}
              onIonChange={(e) => setUsername(e.detail.value)}
            />

            <IonInput
              fill="outline"
              label="Answer"
              style={{ width: "500px" }}
              value={answer}
              onIonChange={(e) => setAnswer(e.detail.value)}
            />

            <IonButton color="primary" type="submit">
              Submit Answer
            </IonButton>
          </form>

          <br />
          <br />

          {/* ANSWERS LIST */}
          <IonList style={{ width: "500px" }}>
            {answersData?.map((a) => (
              <IonItem key={a.id}>
                <IonLabel>
                  <IonText>
                    <strong>{a.username}</strong>: {a.answer}
                  </IonText>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>

          <IonButton color="warning" routerLink="/">
            Back To Home Page
          </IonButton>
        </IonContent>
      </IonPage>
    </>
  );
};

export default CreateAnswer;
