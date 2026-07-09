// @ts-nocheck
import {
  IonPage,
  IonInput,
  IonContent,
  IonButton,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardContent,
} from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";

const SpecificGame = () => {
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      roomCode: "",
    },
  });
  const roomCode = watch("roomCode");
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["specificGame"],
    queryFn: () =>
      fetch(`http://localhost:3000/game/${roomCode}`, {
        cache: "no-store",
      }).then((res) => res.json()),
    enabled: false,
  });

  const onSubmit = () => {
    if (!roomCode.trim()) {
      alert("Please provide a roomCode");
      return;
    }
    refetch().then((result) => {
      const response = result.data;
      if (!response) {
        alert("Server unreachable / invalid response.");
        return;
      }
      if (response.error) {
        alert(response.error);
        return;
      }
      console.log("Game: ", response.data);
      reset({ roomCode: "" });
    });
  };

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
          <h3>Let's retrieve a game, please enter a room code.</h3>
          <br />
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              width: "100%",
            }}
          >
            <Controller
              name="roomCode"
              control={control}
              render={({ field }) => (
                <IonInput
                  fill="outline"
                  label="RoomCode"
                  style={{ width: "500px" }}
                  value={field.value}
                  onIonChange={(e) => field.onChange(e.detail.value)}
                ></IonInput>
              )}
            />

            <br />
            {isLoading && <p>Loading...</p>}
            {data && !data.error && (
              <IonCard
                style={{
                  width: "500px",
                  background: "#2D1E3B",
                  color: "white",
                  padding: "20px",
                  borderRadius: "14px",
                  textAlign: "left",
                }}
              >
                <IonCardHeader>Game Record</IonCardHeader>
                <IonCardContent>
                  <p>
                    <strong>Room Code: </strong>
                    {data.data.roomCode}
                  </p>
                  <p>
                    <strong>Celebrity Name: </strong>
                    {data.data.celebrityName}
                  </p>
                </IonCardContent>
              </IonCard>
            )}
            <IonButton color="primary" type="submit">
              Retrieve Game
            </IonButton>
          </form>

          <br />
          <br />
          <IonButton color="warning" routerLink="/">
            Back To Home Page
          </IonButton>
        </IonContent>
      </IonPage>
    </>
  );
};

export default SpecificGame;
