import React from "react";
import { Card, Avatar } from "antd";
import "antd/dist/antd.css";
import { useQuery } from "react-query";
import { fetchBoards } from "../../queries/boardQueries";

interface Board {
  _id: string;
  title: string;
}
const Home = () => {
  const { isLoading, data: board, error } = useQuery("boards", fetchBoards);
  const { Meta } = Card;

  return (
    <div className="max-w-xl mx-auto my-20">
      {board?.map((item: Board) => (
        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
        >
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={item.title}
            description="This is the description"
          />
        </Card>
      ))}
    </div>
  );
};

export default Home;
