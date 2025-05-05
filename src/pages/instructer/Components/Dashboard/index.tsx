import { useInstructerContext } from "../../InstructerContext";

function Dashboard() {
  const { courses } = useInstructerContext();
  console.log({ courses });

  return <div>Dashboard</div>;
}

export default Dashboard;
