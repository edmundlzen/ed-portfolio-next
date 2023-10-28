import { NextPage } from "next";
import { IndexRoom } from "~/components";
import Home from "~/components/home";

const Index: NextPage = () => {
  return (
    <IndexRoom>
      <Home />
    </IndexRoom>
  );
};

export default Index;
