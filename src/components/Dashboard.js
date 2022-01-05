import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/Auth";
import { supabase } from "../supabase";
import Select from "react-select";


const options = [
  { value: "gluten", label: "Gluten" },
  { value: "lactose", label: "Lactose" },
  { value: "noten", label: "Noten" },
];

let defaultValues = [];

export function Dashboard(partyUrl, setPartyUrl) {
  const [loading, setLoading] = useState(true);
  const [party, setParty] = useState(false);
  const [partyDate, setPartyDate] = useState(false);
  const [username, setUsername] = useState(null);
  const [allergies, setAllergies] = useState(null);
  // const [selectorAllergies, setSelectorAllergies] = useState([]);
  const [avatar_url, setAvatarUrl] = useState(null);
  const { user, signOut } = useAuth();
  const history = useNavigate();

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line
  }, []);

  // async function sendInvitation() {
  //   // try {
  //   //   console.log("sending email");
  //   //   const { data, error } = await supabase
  //   //     .rpc('send_email_message', {
  //   //       "sender": "finlaydegrauwe@gmail.com",
  //   //       "recipient": "finlaydegrauwe@gmail.com",
  //   //       "subject": "This is a test message from my Supabase app!",
  //   //       "html_body": "<html><body>This message was sent from <a href=\"https://postgresql.org\">PostgreSQL</a> using <a href=\"https://supabase.io\">Supabase</a> and <a href=\"https://sendinblue.com\">Sendinblue</a>.</body></html>"
  //   //     })

  //   let { data, error } = await supabase.rpc("send_email_message", {
  //     sender: "finlaydegrauwe@gmail.com",
  //     recipient: "finlaydegrauwe@gmail.com",
  //     subject: "This is a test message from my Supabase app!",
  //     html_body:
  //       '<html><body>This message was sent from <a href="https://postgresql.org">PostgreSQL</a> using <a href="https://supabase.io">Supabase</a> and <a href="https://sendinblue.com">Sendinblue</a>.</body></html>',
  //   });

  //   if (error) console.error(error);
  //   else console.log(data);
  //   console.log("email sent");
  // }

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, allergies, avatar_url`)
        .eq("id", user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAllergies(data.allergies);
        setAvatarUrl(data.avatar_url);
        for (var i = 0; i < data.allergies.length; i++) {
          const newElement = {
            value: data.allergies[i].toLowerCase(),
            label: data.allergies[i].replace(/^\w/, (c) => c.toUpperCase()),
          };
          defaultValues.push(newElement);
        }
        // setSelectorAllergies(defaultValues);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, allergies, avatar_url }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      defaultValues = [];
      for (var i = 0; i < allergies.length; i++) {
        const newElement = {
          value: allergies[i].toLowerCase(),
          label: allergies[i].replace(/^\w/, (c) => c.toUpperCase()),
        };
        defaultValues.push(newElement);
        console.log(defaultValues);
      }

      const updates = {
        id: user.id,
        username,
        allergies,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    await signOut();

    history("/login");
  }

  async function createParty(e) {
    e.preventDefault();
      setParty("Type a name for your party");
    try {
      if (party.length > 1 && partyDate) {
        let { data, error } = await supabase
          .from("events")
          .insert([
            {
              name: party,
              date: partyDate,
              url:
              party.replace(/[^a-z0-9-]/gi, "_")
              .toLowerCase()
              .replace(/_{2,}/g, "_") +'-'+
              partyDate
                .replace(/[^a-z0-9-]/gi, "_")
                .toLowerCase()
                .replace(/_{2,}/g, "_"),
              guests:
              {[username] : {name : username, allergies: allergies}}
            },
          ])
          .single();
          partyUrl.setPartyUrl(party.replace(/[^a-z0-9-]/gi, "_")
          .toLowerCase()
          .replace(/_{2,}/g, "_") +'-'+
            partyDate
              .replace(/[^a-z0-9-]/gi, "_")
              .toLowerCase()
              .replace(/_{2,}/g, "_"))
      if (error) {
        throw error;
      } else {
        console.log(data)
        console.log(party + partyDate + " created in database ");
      setParty("Creating your party");
      history('/event/'+party.replace(/[^a-z0-9-]/gi, "_")
      .toLowerCase()
      .replace(/_{2,}/g, "_") +'-'+
        partyDate
          .replace(/[^a-z0-9-]/gi, "_")
          .toLowerCase()
          .replace(/_{2,}/g, "_"))
      }
    }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);

    }
  }

  function setAllergyFunction(e) {
    let selectedAllergies = [];
    for (var i = 0; i < e.length; i++) {
      selectedAllergies.push(e[i].label);
    }
    setAllergies(selectedAllergies);
  }

  return (
    <div>
      <p>Welcome, {username}!</p>
      {/* 
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={user.email} disabled />
      </div> */}
      <div style={{ marginBottom: "1em" }}>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "1em" }}>
        <label htmlFor="allergies">Allergies</label>
        {!loading && (
          <Select
            isMulti
            defaultValue={defaultValues}
            onChange={(e) => setAllergyFunction(e)}
            options={options}
          />
        )}
      </div>

      <p>
        <button
          className="button block primary"
          onClick={() => updateProfile({ username, allergies, avatar_url })}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
        <span> </span>
        <button onClick={handleSignOut}>Sign out</button>
      </p>
      <form>
        <p>
          {party && (
            <>
              <input
                className="display-initial"
                value={party}
                onChange={(event) => {
                  setParty(event.target.value);
                }}
                type="text"
                autoFocus
                onFocus={(e) => e.target.select()}
              />
              <input
                className="display-initial"
                type="date"
                id="birthday"
                name="birthday"
                onChange={(event) => {
                  setPartyDate(event.target.value);
                }}
              ></input>
            </>
          )}
          <button onClick={createParty}>Make a new dinner party</button>
        </p>
      </form>
      {/* <p>
        <button onClick={sendInvitation}>Send email</button>
      </p> */}
    </div>
  );
}
