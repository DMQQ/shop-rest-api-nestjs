import Expo from "expo-server-sdk";

export const expo = new Expo();

export const NewProductNotification = (tokens: string[], product: string) => {
  const N = tokens.length;
  const messages = [];

  for (let i = 0; i < N; i++) {
    messages.push({
      to: tokens[i],
      title: "New Product avaiable now",
      body: product,
    });
  }
  return messages;
};
