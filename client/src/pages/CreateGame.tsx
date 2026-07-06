// @ts-nocheck
import {
  IonPage,
  IonInput,
  IonContent,
  IonButton,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useForm, Controller } from "react-hook-form";

const CreateGame = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      roomCode: "",
      celebrityName: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    reset({
      roomCode: "",
      celebrityName: "",
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
          <h3>
            Let's create a new game, please enter a room code and the celebrity
            name.
          </h3>
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
            <Controller
              name="celebrityName"
              control={control}
              render={({ field }) => (
                <IonInput
                  fill="outline"
                  label="Celebrity Name"
                  style={{ width: "500px" }}
                  value={field.value}
                  onIonChange={(e) => field.onChange(e.detail.value)}
                ></IonInput>
              )}
            />
            <br />
            <IonButton color="primary" type="submit">
              Create Game
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

export default CreateGame;
