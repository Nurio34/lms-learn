function Settings() {
    return (
        <form className="py-3">
            <label htmlFor="image" className="flex gap-3 items-center">
                <p className="font-semibold text-left">Upload Course Image</p>
                <input
                    type="file"
                    name="image"
                    id="image"
                    className=" border-2 rounded-lg overflow-hidden"
                />
            </label>
        </form>
    );
}

export default Settings;
