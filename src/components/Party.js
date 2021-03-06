import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";

export default function Party() {
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [description, setDescription] = useState();
  const [guests, setGuests] = useState();
  const [creator, setCreator] = useState();
  const [addGuest, setaddGuest] = useState(false);
  const [guestToAdd, setguestToAdd] = useState("");
  let params = useParams();

  async function handleDescriptionChange(event) {
    setDescription(event.target.value);
    await supabase
      .from("events")
      .update(
        { description: event.target.value },
        {
          returning: "minimal",
        }
      )
      .eq("url", params.eventId);
  }

  async function checkGuest() {
    //eslint-disable-next-line
    let re =
      //eslint-disable-next-line
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(guestToAdd)) {
        let { data, error } = await supabase.rpc('send_email_message',{message:{
          "sender": "yum-me-invite@sendinblue.com",
          "recipient": guestToAdd,
          "subject": ""+creator+" invited you for a Yum-me dinner party: "+name,
          // "old_body": "<html><body>This message was sent from <a href=\"https://postgresql.org\">PostgreSQL</a> using <a href=\"https://supabase.io\">Supabase</a> and <a href=\"https://sendinblue.com\">Sendinblue</a>.</body></html>",
          "html_body": "<html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\"><head><!--[if gte mso 9]><xml><o:officedocumentsettings><o:allowpng><o:pixelsperinch>96</o:pixelsperinch></o:officedocumentsettings></xml><![endif]--><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><meta name=\"x-apple-disable-message-reformatting\"><!--[if !mso]><!--><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"><!--<![endif]--><title></title><style type=\"text/css\">table,td{color:#000}a{color:#00e;text-decoration:underline}@media only screen and (min-width:520px){.u-row{width:500px!important}.u-row .u-col{vertical-align:top}.u-row .u-col-50{width:250px!important}.u-row .u-col-100{width:500px!important}}@media (max-width:520px){.u-row-container{max-width:100%!important;padding-left:0!important;padding-right:0!important}.u-row .u-col{min-width:320px!important;max-width:100%!important;display:block!important}.u-row{width:calc(100% - 40px)!important}.u-col{width:100%!important}.u-col>div{margin:0 auto}}body{margin:0;padding:0}table,td,tr{vertical-align:top;border-collapse:collapse}p{margin:0}.ie-container table,.mso-container table{table-layout:fixed}*{line-height:inherit}a[x-apple-data-detectors=true]{color:inherit!important;text-decoration:none!important}</style><!--[if !mso]><!--><link href=\"https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap\" rel=\"stylesheet\" type=\"text/css\"><link href=\"https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700&display=swap\" rel=\"stylesheet\" type=\"text/css\"><!--<![endif]--></head><body class=\"clean-body u_body\" style=\"margin:0;padding:0;-webkit-text-size-adjust:100%;background-color:#e7e7e7;color:#000\"><!--[if IE]><div class=\"ie-container\"><![endif]--><!--[if mso]><div class=\"mso-container\"><![endif]--><table style=\"border-collapse:collapse;table-layout:fixed;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;vertical-align:top;min-width:320px;Margin:0 auto;background-color:#e7e7e7;width:100%\" cellpadding=\"0\" cellspacing=\"0\"><tbody><tr style=\"vertical-align:top\"><td style=\"word-break:break-word;border-collapse:collapse!important;vertical-align:top\"><!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td align=\"center\" style=\"background-color:#e7e7e7\"><![endif]--><div class=\"u-row-container\" style=\"padding:0;background-color:transparent\"><div class=\"u-row\" style=\"Margin:0 auto;min-width:320px;max-width:500px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;background-color:transparent\"><div style=\"border-collapse:collapse;display:table;width:100%;background-color:transparent\"><!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding:0;background-color:transparent\" align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:500px\"><tr style=\"background-color:transparent\"><![endif]--><!--[if (mso)|(IE)]><td align=\"center\" width=\"500\" style=\"width:500px;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent\" valign=\"top\"><![endif]--><div class=\"u-col u-col-100\" style=\"max-width:320px;min-width:500px;display:table-cell;vertical-align:top\"><div style=\"width:100%!important\"><!--[if (!mso)&(!IE)]><!--><div style=\"padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent\"><!--<![endif]--><table style=\"font-family:'Open Sans',sans-serif\" role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\"><tbody><tr><td style=\"overflow-wrap:break-word;word-break:break-word;padding:40px 10px 20px 10px;font-family:'Open Sans',sans-serif\" align=\"left\"><div style=\"line-height:130%;text-align:left;word-wrap:break-word\"><p dir=\"ltr\" style=\"font-size:14px;line-height:130%;text-align:center\"><strong><span style=\"font-size:24px;line-height:31.2px;font-family:'Source Sans Pro',sans-serif\">You've been invited by "+creator+" for a Yum-me dinner party!<br><br>"+name+"</span></strong></p></div></td></tr>    <tr><td style=\"overflow-wrap:break-word;word-break:break-word;padding:20px 10px;font-family:'Open Sans',sans-serif\" align=\"left\"><div style=\"line-height:120%;text-align:left;word-wrap:break-word\"><p dir=\"ltr\" style=\"font-size:12px;line-height:130%;text-align:center\"><span style=\"font-size:24px;line-height:31.2px;font-family:'Source Sans Pro',sans-serif\">"+description+"</span></p></div></td></tr>      </tbody></table><!--[if (!mso)&(!IE)]><!--></div><!--<![endif]--></div></div><!--[if (mso)|(IE)]><![endif]--><!--[if (mso)|(IE)]><![endif]--></div></div></div><div class=\"u-row-container\" style=\"padding:0;background-color:transparent\"><div class=\"u-row\" style=\"Margin:0 auto;min-width:320px;max-width:500px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;background-color:transparent\"><div style=\"border-collapse:collapse;display:table;width:100%;background-color:transparent\"><!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding:0;background-color:transparent\" align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:500px\"><tr style=\"background-color:transparent\"><![endif]--><!--[if (mso)|(IE)]><td align=\"center\" width=\"250\" style=\"width:250px;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0\" valign=\"top\"><![endif]--><div class=\"u-col u-col-50\" style=\"max-width:320px;min-width:250px;display:table-cell;vertical-align:top\"><div style=\"width:100%!important;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0\"><!--[if (!mso)&(!IE)]><!--><div style=\"padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0\"><!--<![endif]--><table style=\"font-family:'Open Sans',sans-serif\" role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\"><tbody><tr><td style=\"overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif\" align=\"left\"><div style=\"line-height:140%;text-align:left;word-wrap:break-word\"><p style=\"font-size:14px;line-height:140%;text-align:center\">Don't have an account yet?</p></div></td></tr></tbody></table><table style=\"font-family:'Open Sans',sans-serif\" role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\"><tbody><tr><td style=\"overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif\" align=\"left\"><div align=\"center\"><!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-spacing:0;border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;font-family:'Open Sans',sans-serif\"><tr><td style=\"font-family:'Open Sans',sans-serif\" align=\"center\"><v:roundrect xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:w=\"urn:schemas-microsoft-com:office:word\" href=\"https://yum-me-alpha.vercel.app/signup\" style=\"height:37px;v-text-anchor:middle;width:88px\" arcsize=\"11%\" stroke=\"f\" fillcolor=\"#3AAEE0\"><w:anchorlock><center style=\"color:#fff;font-family:'Open Sans',sans-serif\"><![endif]--><a href=\"https://yum-me-alpha.vercel.app/signup\" target=\"_blank\" style=\"box-sizing:border-box;display:inline-block;font-family:'Open Sans',sans-serif;text-decoration:none;-webkit-text-size-adjust:none;text-align:center;color:#fff;background-color:#3aaee0;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;width:auto;max-width:100%;overflow-wrap:break-word;word-break:break-word;word-wrap:break-word;mso-border-alt:none\"><span style=\"display:block;padding:10px 20px;line-height:120%\"><span style=\"font-size:14px;line-height:16.8px\">Sign up</span></span></a><!--[if mso]><![endif]--></div></td></tr></tbody></table><!--[if (!mso)&(!IE)]><!--></div><!--<![endif]--></div></div><!--[if (mso)|(IE)]><![endif]--><!--[if (mso)|(IE)]><td align=\"center\" width=\"250\" style=\"width:250px;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0\" valign=\"top\"><![endif]--><div class=\"u-col u-col-50\" style=\"max-width:320px;min-width:250px;display:table-cell;vertical-align:top\"><div style=\"width:100%!important;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0\"><!--[if (!mso)&(!IE)]><!--><div style=\"padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0\"><!--<![endif]--><table style=\"font-family:'Open Sans',sans-serif\" role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\"><tbody><tr><td style=\"overflow-wrap:break-word;word-break:break-word;padding:40px;font-family:'Open Sans',sans-serif\" align=\"left\"><div align=\"center\"><!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-spacing:0;border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;font-family:'Open Sans',sans-serif\"><tr><td style=\"font-family:'Open Sans',sans-serif\" align=\"center\"><v:roundrect xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:w=\"urn:schemas-microsoft-com:office:word\" href=\"https://yum-me-alpha.vercel.app/event/"+params.eventId+"\" style=\"height:37px;v-text-anchor:middle;width:152px\" arcsize=\"11%\" stroke=\"f\" fillcolor=\"#3AAEE0\"><w:anchorlock><center style=\"color:#fff;font-family:'Open Sans',sans-serif\"><![endif]--><a href=\"https://yum-me-alpha.vercel.app/event/"+params.eventId+"\" target=\"_blank\" style=\"box-sizing:border-box;display:inline-block;font-family:'Open Sans',sans-serif;text-decoration:none;-webkit-text-size-adjust:none;text-align:center;color:#fff;background-color:#3aaee0;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;width:auto;max-width:100%;overflow-wrap:break-word;word-break:break-word;word-wrap:break-word;mso-border-alt:none\"><span style=\"display:block;padding:10px 20px;line-height:120%\">Go to the event &gt;</span></a><!--[if mso]><![endif]--></div></td></tr></tbody></table><!--[if (!mso)&(!IE)]><!--></div><!--<![endif]--></div></div><!--[if (mso)|(IE)]><![endif]--><!--[if (mso)|(IE)]><![endif]--></div></div></div><!--[if (mso)|(IE)]><![endif]--></td></tr></tbody></table><!--[if mso]><![endif]--><!--[if IE]><![endif]--></body></html>"
        }});
        if (error) console.error(error)
      else console.log(data)

      // try {
      // console.log(guests)
      // console.log(guestToAdd)

      let eventGuests = { ...guests };
      let oldValueGuests = { ...guests };
      // console.log(eventGuests)
      eventGuests[guestToAdd] = {
        name: guestToAdd,
        allergies: ["Invitation pending"],
      };
      console.log(eventGuests);
      console.log(oldValueGuests);
      await supabase
        .from("events")
        .update(
          { guests: eventGuests },
          {
            returning: "minimal",
          }
        )
        .eq("url", params.eventId);
      setaddGuest(eventGuests);
      setGuests(eventGuests);
      // } catch (error) {
      //   alert(error.message);
      // } finally {
      setguestToAdd("");
      setaddGuest(false);
      // }
    } else {
      // invalid email, maybe show an error to the user.
      alert("The email you entered is not valid");
    }
  }

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
        setCreator(data.creator);
      } else {
        setName("This event does not exist, go back to the home page");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      console.log(guests);
    }
  }

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
      <textarea
        name="Text1"
        value={description}
        onChange={(event) => {
          handleDescriptionChange(event);
        }}
      ></textarea>
      <h3>Guests</h3>
      {Object.prototype.toString.call(guests) === "[object Object]" && (
        <ul>
          {Object.keys(guests).map((key) => (
            <li key={key}>
              {guests[key].name + ": " + guests[key].allergies.join(", ")}
            </li>
          ))}
          <li id="addguest" style={{ cursor: "pointer" }}>
            {addGuest ? (
              <>
                <label style={{ marginTop: ".3em", fontWeight: "normal" }}>
                  Email
                </label>
                <input
                  value={guestToAdd}
                  onChange={(event) => {
                    setguestToAdd(event.target.value);
                  }}
                  style={{ flexGrow: "6" }}
                  type="email"
                />
                <button style={{ flexGrow: "2" }} onClick={() => checkGuest()}>
                  Invite guest
                </button>
                <button onClick={() => setaddGuest(false)}>X</button>
              </>
            ) : (
              <span style={{ flexGrow: "2" }} onClick={() => setaddGuest(true)}>
                + Add Guest
              </span>
            )}
          </li>
        </ul>
      )}
    </>
  );
}
