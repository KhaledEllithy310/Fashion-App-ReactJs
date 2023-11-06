import { useEffect, useState } from "react";
import { getSections, getSectionsById } from "../Services/SectionsApi.js";

export const useFetchSections = (sectionId = null) => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      let data;
      // fetch all products
      if (sectionId === null) data = await getSections();
      // fetch product By Id
      else data = await getSectionsById(sectionId);
      // console.log(data);
      setSections(data.data);
    };

    fetchSections();
  }, [sectionId]);

  return [sections, setSections];
};
