/* eslint-disable @typescript-eslint/no-explicit-any */
import { firebaseDb } from "../config/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

type createNewUserProps = {
  user?: any;
};

export const createNewUser = async ({
  user,
}: createNewUserProps): Promise<any> => {
  if (user) {
    const docRef = doc(
      firebaseDb,
      "users",
      user?.primaryEmailAddress?.emailAddress ?? ""
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const formattedData = {
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt.toDate(),
      };
      return formattedData;
    } else {
      const data = {
        fullName: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        createdAt: new Date(),
        credits: 5,
      };

      await setDoc(
        doc(firebaseDb, "users", user.primaryEmailAddress?.emailAddress ?? ""),
        {
          ...data,
        }
      );

      return data;
    }
  }

  return { message: "User not found" };
};

export const saveDoc = async ({
  pathName,
  pathSegment,
  data,
}: {
  pathName: string;
  pathSegment: any;
  data: { [key: string]: any };
}) => {
  try {
    await setDoc(doc(firebaseDb, pathName, pathSegment), {
      ...data,
    });

    return { message: "Success" };
  } catch (error) {
    return { message: "Something went wrong", error };
  }
};
