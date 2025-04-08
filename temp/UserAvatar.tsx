import React, { useContext } from "react";
import {
  LOGOUT_MODAL_CONTEXT,
  USER_PROFILE_CONTEXT,
  LOGIN_MODAL_CONTEXT,
  SIGNUP_MODAL_CONTEXT,
} from "../contexts";
import { Avatar, Popover } from "antd";
import { ShieldCheck } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export function UserAvatar({ showName, auth }) {
  const { userProfile } = useContext(USER_PROFILE_CONTEXT);
  const { setSignupOpen } = useContext(SIGNUP_MODAL_CONTEXT);
  const { setLoginOpen } = useContext(LOGIN_MODAL_CONTEXT);
  const { setLogoutOpen } = useContext(LOGOUT_MODAL_CONTEXT);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("user Profile changed", userProfile);
  }, [userProfile]);
  let name = userProfile && (userProfile.firstName || userProfile.brandName);
  const options = (
    <div>
      <ul className="space-y-2 mx-2 px-2 min-w-[10ch]">
        {/* Admin: admin and signout */}
        {userProfile && userProfile.role === "ADMIN" ? (
          <>
            <li
              className="flex items-center gap-1.5 hover:font-semibold hover:text-Primary transition-colors cursor-pointer select-none"
              onClick={() => {
                navigate("/admin");
              }}>
              <ShieldCheck className="w-4 h-4 text-Primary" /> Admin
            </li>
            <li
              className="hover:font-semibold hover:text-red-500 transition-colors cursor-pointer select-none"
              onClick={() => {
                setLogoutOpen(true);
              }}
            >
              Sign out
            </li>
          </>
        ) : null}
        {/*Merchant: Dashboard and signout */}  
        {userProfile && userProfile.userType === "merchant" ? (
          <>
            <li
              className="hover:font-semibold hover:text-Primary transition-colors cursor-pointer select-none"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Dashboard
            </li>
            <li
              className="hover:font-semibold hover:text-red-500 transition-colors cursor-pointer select-none"
              onClick={() => {
                setLogoutOpen(true);
              }}
            >
              Sign out
            </li>
          </>
        ) : null}
        {/*Customer: Bookmark and signout */}  
        {userProfile && userProfile.userType === "customer" ? (
          <>
            <li
              className="hover:font-semibold hover:text-Primary transition-colors cursor-pointer select-none"
              onClick={() => {
                navigate("/dashboard/bookmark");
              }}
            >
              Bookmark
            </li>
            <li
              className="hover:font-semibold hover:text-red-500 transition-colors cursor-pointer select-none"
              onClick={() => {
                setLogoutOpen(true);
              }}
            >
              Sign out
            </li>
          </>
        ) : null}
      </ul>
    </div>
  );
  return userProfile ? (
    <span
      onDoubleClick={() => {
        navigate("/dashboard");
      }}
      className="select-none"
    >
      <Popover
        placement="bottom"
        content={options}
        style={{ backgroundColor: "#EBEBEB" }}
        mouseEnterDelay={0.3}
        mouseLeaveDelay={0.5}
      >
        <div className="cursor-pointer">
          {showName ? (
            <div className="flex items-center bg-white px-2 py-1.5 rounded-full">
              <Avatar
                style={{ backgroundColor: "#F8912D", verticalAlign: "middle" }}
                size="medium"
              >
                <span className="font-semibold">{name[0]}</span>
              </Avatar>
              <span className="ml-2 font-semibold text-Primary algin-middle">
                {name}
              </span>
            </div>
          ) : (
            <Avatar
              style={{ backgroundColor: "orange", verticalAlign: "middle" }}
              size="medium"
            >
              <span className="font-semibold">{name[0]}</span>
            </Avatar>
          )}
        </div>
      </Popover>
    </span>
  ) : (
    auth && (
      <div
        className={`flex ${showName ? "md:flex-row flex-col gap-3" : "hidden"}`}
      >
        <button
          onClick={(e) => {
            setLoginOpen(true);
            e.stopPropagation();
          }}
          className="hover:bg-white px-4 py-1 border border-white rounded-full text-white hover:text-Primary transition"
        >
          Login
        </button>
        <button
          onClick={(e) => {
            setSignupOpen(true);
            e.stopPropagation();
          }}
          className="bg-Primary hover:bg-P2 px-4 py-1 rounded-full text-white transition"
        >
          Sign Up
        </button>
      </div>
    )
  );
}
