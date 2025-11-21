import { useUserStore } from "../store/useUserStore";

const HomePage = () => {
  const { token, user_id, user_name } = useUserStore();
  console.log(token, user_id, user_name);
  return <div>HomePage</div>;
};

export default HomePage;
