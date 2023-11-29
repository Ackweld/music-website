// import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

import { ApiService } from "../../services/ApiService";
import styles from "./Biography.module.css";
import { useEffect, useState } from "react";

interface IBiography {
  fields: {
    profilePicture: { fields: { file: { url: string }; name: string } };
    text: Document; //Hopefully this is right? Maybe some html-type thing instead
  };
}

export const Biography = () => {
  const [biography, setBiography] = useState<IBiography>();

  useEffect(() => {
    const getBiography = async () => {
      const biographyEntry: IBiography = await ApiService.getEntry("biography");
      if (biographyEntry) {
        setBiography(biographyEntry);
      }
    };
    getBiography();
  }, []);

  if (biography) {
    return (
      <div className={styles.card}>
        <img
          src={`https:${biography.fields.profilePicture.fields.file.url}`}
          alt={`${biography.fields.profilePicture.fields.name}`}
          className={styles.profilePicture}
          loading="lazy"
        ></img>
        <div className={styles.biography}>
          {documentToReactComponents(biography.fields.text)}
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};
