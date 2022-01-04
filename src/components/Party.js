import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";

export default function Party() {
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [description, setDescription] = useState();
  const [guests, setGuests] = useState();
  let params = useParams();

  useEffect(() => {
    getEvent();
    // eslint-disable-next-line
  }, []);

  async function getEvent() {
    try {
      let { data, error, status } = await supabase
        .from("events")
        .select(`*`)
        .eq("url", params.eventId)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        console.log(data);
        setName(data.name);
        setDate(new Date(data.date).toDateString());
        setDescription(data.description);
        setGuests(data.guests);
      } else {
        setName("This event does not exist, go back to the home page");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      console.log(guests);
    }
  }

  // async function updateEvent({ username, allergies, avatar_url }) {
  //   try {
  //     setLoading(true);
  //     const user = supabase.auth.user();
  //     defaultValues = [];
  //     for (var i = 0; i < allergies.length; i++) {
  //       const newElement = {
  //         value: allergies[i].toLowerCase(),
  //         label: allergies[i].replace(/^\w/, (c) => c.toUpperCase()),
  //       };
  //       defaultValues.push(newElement);
  //       console.log(defaultValues);
  //     }

  //     const updates = {
  //       id: user.id,
  //       username,
  //       allergies,
  //       avatar_url,
  //       updated_at: new Date(),
  //     };

  //     let { error } = await supabase.from("profiles").upsert(updates, {
  //       returning: "minimal", // Don't return the value after inserting
  //     });

  //     if (error) {
  //       throw error;
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ paddingRight: "2rem" }}>{name}</h2>
        <h2>{date}</h2>
      </div>
      {/* todo: editable items (name, date, description) and adding guests */}
      <h3>{description}</h3>
      <h3>Guests</h3>
      {Object.prototype.toString.call(guests) === "[object Object]" && (
        <ul>
          {Object.keys(guests).map((key) => (
            <li key={key}>{guests[key].name+': '+guests[key].allergies.join(', ')}</li>
          ))}
        </ul>
      )}
    </>
  );
}
