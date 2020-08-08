import React from "react";
import { Dropdown, Menu } from "antd";
import HomeIcon from "./icons/HomeIcon";

const profileOptions = (
  <Menu>
    <Menu.Item key="0">
      <div className="w-32 mx-auto">Himanshu Nagrath</div>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
      <div className="mr-32">Profile and Visibility</div>
    </Menu.Item>
    <Menu.Item key="2">Activity</Menu.Item>
    <Menu.Item key="3">Cards</Menu.Item>
    <Menu.Item key="4">Settings</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="5">Help</Menu.Item>
    <Menu.Item key="6">Shortcuts</Menu.Item>
    <Menu.Item key="7">Log Out</Menu.Item>
  </Menu>
);

const Navbar = () => {
  return (
    <div className="flex items-center justify-between w-screen h-10 mb-4 bg-blue-700">
      <div className="p-2 ml-2 text-white bg-blue-400 rounded cursor-pointer">
        <HomeIcon className="w-5 h-5" />
      </div>
      <span className="font-medium text-white">My Board</span>
      <Dropdown overlay={profileOptions} trigger={["click"]}>
        <span className="p-2 mr-2 text-sm font-semibold text-white bg-blue-400 rounded-full cursor-pointer">
          HN
        </span>
      </Dropdown>
    </div>
  );
};

export default Navbar;
