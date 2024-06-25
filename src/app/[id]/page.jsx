"use client";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ErrorPage from "./error";
import Loading from "../loading";

function Home() {
  const Parmas = useParams();
  const [User, SetUser] = useState({});
  const [error, setError] = useState(null);
  const [IsLoading, SetLoading] = useState(true);

  useEffect(() => {
    const GetUserData = async () => {
      try {
        SetLoading(true);
        await axios
          .get(`https://nfc.cornerstonedv.com/api/profiles/${Parmas.id}`)
          .then((res) => {
            if (res.data.status) {
              SetUser(res.data.data);
              SetLoading(false);
            } else {
              throw new Error();
            }
          });
      } catch (err) {
        SetLoading(false);
        setError(err.message);
      }
    };
    GetUserData();
  }, [Parmas.id]);

  return IsLoading ? (
    <Loading />
  ) : error ? (
    <ErrorPage />
  ) : (
    <div className="User_Contact">
      {/* <!--General-info--> */}
      <div className="General-info">
        <div className="container">
          <div className="avatar">
            <Image
              src={User?.photo ? User.photo : "/User.jpg"}
              alt="User"
              width={400}
              height={500}
              priority={true}
            />
          </div>
          <div className="info">
            <Image src="/FullLogo.png" alt="Logo" width={100} height={300} />
            <div className="user-name">
              <h1>
                {`${User.first_name ? User.first_name : ""} ${
                  User.middle_name ? User.middle_name : ""
                } ${User.last_name ? User.last_name : ""}`}
              </h1>
              <p>{User.role ? User.role : ""}</p>
            </div>
          </div>
        </div>
      </div>
      {/* <!--General-Actions--> */}
      <div className="General-Actions">
        <div className="container">
          <a className="action">
            <i className="fa-solid fa-message"></i>
            <span>Message</span>
          </a>

          {User?.mobiles && (
            <a className="action" href={`tel:${User?.mobiles[1]}`}>
              <i className="fa-solid fa-phone"></i>
              <span>Call</span>
            </a>
          )}

          {User?.emails && (
            <a className="action" href={`mailto:${User?.emails[1]}`}>
              <i className="fa-solid fa-envelope"></i>
              <span>Mail</span>
            </a>
          )}

          {User.download_link && (
            <a className="action" href={User.download_link}>
              <i className="fa-solid fa-floppy-disk"></i>
              <span>Save</span>
            </a>
          )}
        </div>
      </div>
      {/* <!--General-Information--> */}
      <div className="User-Information">
        <div className="container">
          {User?.mobiles?.map((Mob, index) => (
            <a className="box" key={index} href={`tel:${Mob}`}>
              <p>Phone {index + 1} :</p>
              <span>{Mob}</span>
            </a>
          ))}
          {User?.emails?.map((mail, index) => (
            <a className="box" key={index} href={`mailto:${mail}`}>
              <p>Email {index + 1} :</p>
              <span>{mail}</span>
            </a>
          ))}

          <a className="box">
            <p>Address :</p>
            <span>18 Almazah,st , from al thawra, st,cairo , egypt </span>
          </a>
          {User?.organization_url && (
            <div className="box">
              <p>Website :</p>
              <span>https://cornerstonedv.com/</span>
            </div>
          )}

          <ul className="Social">
            <li>
              <a href="">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </li>
            <li>
              <a href="">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </li>
            <li>
              <a href="">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </li>
          </ul>
          <div className="action-buttons">
            <button>Create new contact</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
