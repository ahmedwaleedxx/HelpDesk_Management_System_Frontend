import { TextInput } from "flowbite-react";

const Home = () => {
    return (
    <div className="py-12" style={{
        padding: "90px 120px",
        alignSelf: "center",
        cursor: "auto"
    }}>
      <h1 className="text-7xl justify-center text-center text-white">Welcome to Supsys</h1>
      <h4 className="text-center font-bold justify-center py-7 italic">Looking for an answer? search for it firstly!</h4>
      <TextInput
        placeholder="Search for an answer....."
        className="w-1/7 mx-auto bg-transparent border-2 rounded-md py-2 px-4 text-blue-700 bg-gradient-to-r"
        name="search"
        />
    </div>
    );
};

export default Home;