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



const SpecificGame = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      roomCode: "",
    },
  });
  const onSubmit = async (data) => {
    console.log(data);
    
    try {
      const serverResponse = await fetch(`http://localhost:3000/game/${data}`, {
        method: "GET",
         
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify(data),
      });
      console.log(data);
      const result = await serverResponse.json();
      alert(result.message);
      if (serverResponse.status === 200) {
        console.log("Game retreived...");
        reset({
          roomCode: "",

        });
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.log(error);
    }
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
            Let's retrieve a game, please enter a room code.
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


            <br />
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
