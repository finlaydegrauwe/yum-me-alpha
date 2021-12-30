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

export function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [allergies, setAllergies] = useState(null);
  const [selectorAllergies, setSelectorAllergies] = useState([]);
  const [avatar_url, setAvatarUrl] = useState(null);
  const { user, signOut } = useAuth();
  const history = useNavigate();

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   console.log(selectorAllergies);
  //   // eslint-disable-next-line
  // }, [selectorAllergies]);

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
        for (var i = 0; i < data.allergies.length; i++){
          const newElement = {value: data.allergies[i].toLowerCase(), label: data.allergies[i].replace(/^\w/, (c) => c.toUpperCase())};
          defaultValues.push(newElement)
          console.log(defaultValues)
        }
        setSelectorAllergies(defaultValues);
      }
    } catch (error) {
      alert(error.message);
    } finally {
        setLoading(false);
        console.log(selectorAllergies)
    }
  }

  async function updateProfile({ username, allergies, avatar_url }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      defaultValues = [];
      for (var i = 0; i < allergies.length; i++){
        const newElement = {value: allergies[i].toLowerCase(), label: allergies[i].replace(/^\w/, (c) => c.toUpperCase())};
        defaultValues.push(newElement)
        console.log(defaultValues)
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

  function setAllergyFunction(e){
      let selectedAllergies = [];
    for (var i = 0; i < e.length; i++){
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
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="allergies">Allergies</label>
        {!loading && <Select
          isMulti
          defaultValue={defaultValues}
          onChange={(e) => setAllergyFunction(e)}
          options={options}
        />}
        {JSON.stringify(allergies)}
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
    </div>
  );
}
