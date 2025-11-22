import Navbar from "../components/Navbar";

const AdminPage = () => {
  return (
    <main className="min-h-screen w-screen bg-blue-300">
      <Navbar />
      <div className="w-screen min-h-[70vh] p-8 grid place-content-center">
        <div className="h-[100px] w-fit md:w-[50vw] p-3  border-solid border-2 border-blue-800 bg-blue-100 min-h-[80vh] rounded-lg shadow">
          <form className="flex pl-10 text-lg font-medium flex-col items-start gap-5 justify-center ">
            {/* username */}

            <div className="flex flex-col w-full items-start">
              <label htmlFor="username" className="text-2xl underline mb-2">
                Username
              </label>
              <input
                type="text"
                className="focus:outline-1 w-full focus:outline-blue-500 p-2 border-blue-500 rounded border "
                id="username"
                required
                maxLength={50}
                placeholder="Enter your username"
              />
            </div>

            {/* age */}
            <div className="flex flex-col w-full items-start">
              <label htmlFor="age" className="text-2xl underline mb-2">
                Age
              </label>
              <input
                type="number"
                className="focus:outline-1 w-full focus:outline-blue-500 p-2 border-blue-500 rounded border "
                id="age"
                required
                max={100}
                placeholder="Enter your Age"
              />
            </div>

            {/* gender */}
            <div className="flex flex-col w-full items-start">
              <label htmlFor="gender" className="text-2xl underline mb-2">
                Choose Gender
              </label>
              <select
                id="gender"
                className="focus:outline-1 focus:outline-blue-500 p-2 w-full border-blue-500 rounded border "
              >
                <option value="">--Select an option--</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <br />
            </div>

            {/* password */}
            <div className="flex flex-col w-full items-start">
              <label htmlFor="password" className="text-2xl underline mb-2">
                Password
              </label>
              <input
                type="password"
                className="focus:outline-1 focus:outline-blue-500 p-2 w-full border-blue-500 rounded border "
                id="password"
                required
                placeholder="Enter your Password"
              />
            </div>

            {/* phone number */}
            <div className="flex flex-col w-full items-start">
              <label htmlFor="phone" className="text-2xl underline mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                className="focus:outline-1 focus:outline-blue-500 p-2 w-full border-blue-500 rounded border "
                id="phone"
                required
                placeholder="Enter your Phonenumber"
              />
            </div>

            {/* accounttype */}
            <div className="flex flex-col w-full items-start">
              <fieldset className="flex gap-x-10">
                <legend>Account Type</legend>
                <div>
                  <input
                    type="radio"
                    id="user"
                    name="account_type"
                    value="user"
                  />
                  <label className="ml-5" for="user">
                    User
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="admin"
                    name="account_type"
                    value="admin"
                  />
                  <label className="ml-5" for="admin">
                    Admin
                  </label>
                </div>
              </fieldset>
            </div>

            {/* button */}

            <button className="px-5 py-3   text-xl font-medium bg-green-600 text-white cursor-pointer rounded hover:text-primary self-center hover:bg-green-700">
              Create User
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AdminPage;
