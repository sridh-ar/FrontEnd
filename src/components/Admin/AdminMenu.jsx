import { useEffect, useState } from "react"
import LoadingScreen from '../common/LoadingScreen'
import { animate } from "framer-motion"
import { useSelector } from "react-redux";
import toast from 'react-hot-toast';


const AdminSection = ({ title = "", description = "", subDescription = "", buttonName = null }) => {
    const configValues = useSelector((state) => state.config.value);

    // Temp State Variable
    const [appName, setAppName] = useState(configValues.appName);

    async function handleSaveOrReset() {
        let bodyData = {};
        if (title == 'Application Name') {
            bodyData = {
                config_name: "appName",
                config_value: appName
            }
        }

        try {
            const response = await fetch("/api/dashboard", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bodyData)
            })

            if (!response.ok) {
                toast.error("Internal Server Error", { duration: 5000, position: "top-right", style: { borderRadius: 5, padding: "15px 20px 15px 20px" } })
            }
            toast.success("AppName Updated Successfully", { duration: 5000, position: "top-right", style: { borderRadius: 5, padding: "15px 20px 15px 20px" } })
        }
        catch (error) {
            toast.error(error.message, { duration: 5000, position: "top-right", style: { borderRadius: 5, padding: "15px 20px 15px 20px" } })
        }
    }

    return (
        <div className="container bg-white w-[95%] m-5 shadow rounded text-sm admin-section">
            <section className={`p-3 px-5 ${title == 'Application Avatar' ? 'flex items-center justify-between' : ''}`}>
                <section>
                    <p className="text-lg font-semibold my-2">{title}</p>
                    <p>{description}</p>
                </section>

                {/* Only for Name */}
                {title == 'Application Name' && <input
                    type="text"
                    placeholder={appName}
                    onChange={event => setAppName(event.target.value)}
                    className="w-[40%] outline-none border-black border-opacity-10 border-[1px] bg-gray-100 shadow p-2 px-4 rounded-md my-3"
                />}

                {/* Only for Avatar */}
                {title == 'Application Avatar' &&
                    <img src="./leo.png" alt="Application Image" className="rounded-full w-14 h-14 shadow ring-1 ring-black mr-5" />
                }
            </section>
            <section className="bg-gray-200 p-3 px-5 flex items-center justify-between text-sm">
                <p>{subDescription}</p>
                {buttonName &&
                    <button
                        className="bg-black text-white px-3 py-1 rounded"
                        onClick={handleSaveOrReset}
                    >{buttonName}</button>
                }
            </section>
        </div>
    )
}

export default function AdminMenu() {
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000);
        // animate("div", { opacity: 0 }, { duration: 0.5 })
    }, [])
    return (
        <div className="bg-gray-200 rounded-md shadow ml-5 overflow-y-auto p-1 w-full">
            {/* Toast */}

            {isLoading && <LoadingScreen />}
            {!isLoading &&
                <>
                    <AdminSection
                        title="Application Name"
                        description="This is your team's visible name. For example, the name of your company or department."
                        subDescription="Please use 8 characters at maximum."
                        buttonName="Save"
                    />

                    <AdminSection
                        title="Application Avatar"
                        description="This is your team's avatar, Click on the avatar to upload a custom one from your files.."
                        subDescription="Please use below 1mb for Optimization."
                    />
                    <AdminSection
                        title="Reset Application"
                        description="This will clear all data from the Players and Team Details from Database."
                        subDescription="Warning! Proceed with caution."
                        buttonName="Reset"
                    />
                    <AdminSection
                        title="Reset Id's"
                        description="This will reset the Primary Key Id in all the tables."
                        subDescription="Warning! Proceed with caution."
                        buttonName="Reset"
                    />
                    <AdminSection
                        title="Move to Local"
                        description="This will move the Images to local Repo."
                        subDescription="Check Firebase Bandwidh before Moving."
                        buttonName="Move"
                    />
                </>
            }
        </div>
    )
}