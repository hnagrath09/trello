import React from "react";
import { Card } from "antd";
import "antd/dist/antd.css";
import { useQuery } from "react-query";
import { fetchBoards } from "../../queries/boardQueries";
import { Link } from "react-router-dom";

interface Board {
  _id: string;
  title: string;
}
const Home = () => {
  const { isLoading, data: board } = useQuery("boards", fetchBoards);
  const { Meta } = Card;

  return (
    <div className="w-screen h-screen bg-gray-200">
      <div className="flex items-center justify-between w-full h-12 px-4 bg-white">
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
        </svg>
        <span className="p-2 mr-2 text-sm font-semibold text-white bg-blue-400 rounded-full cursor-pointer">
          HN
        </span>
      </div>
      <div className="flex flex-wrap max-w-6xl mx-auto mt-8">
        {board?.map((item: Board) => (
          <Link to={`/${item._id}`} key={item._id}>
            <Card
              hoverable
              style={{ width: 240 }}
              loading={isLoading}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
            >
              <Meta title={item.title} />
            </Card>
          </Link>
        ))}
        {!isLoading && (
          <div className="ml-8 bg-gray-400" style={{ width: "240px" }}></div>
        )}
      </div>
    </div>
  );
};

export default Home;
