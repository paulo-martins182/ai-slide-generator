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

export const getDocById = async ({
  pathName,
  pathSegment,
}: {
  pathName: string;
  pathSegment: string;
}): Promise<any> => {
  try {
    const docRef = doc(firebaseDb, pathName, pathSegment);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return { message: "Document not found" };
    }

    return docSnap.data();
  } catch (e) {
    return { message: "Something went wrong", error: e };
  }
};

export const updateDb = async ({
  pathName,
  pathSegment,
  data,
  merge = false,
}: {
  pathName: string;
  pathSegment: string;
  data: any;
  merge?: boolean;
}) => {
  try {
    await setDoc(
      doc(firebaseDb, pathName, pathSegment),
      { ...data },
      { merge }
    );

    return { message: "Success" };
  } catch (error) {
    return { message: "Something went wrong", error };
  }
};
