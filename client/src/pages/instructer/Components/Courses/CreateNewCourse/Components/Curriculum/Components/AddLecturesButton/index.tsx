type AddLecturesButtonType = {
    uploadVideos: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
};

function AddLecturesButton({ uploadVideos }: AddLecturesButtonType) {
    return (
        <div>
            <button type="button">
                <label htmlFor="bulk-upload">
                    Add Lectures
                    <input
                        type="file"
                        name="bulk-upload"
                        id="bulk-upload"
                        hidden
                        multiple
                        accept="video/*"
                        onChange={uploadVideos}
                    />
                </label>
            </button>
        </div>
    );
}

export default AddLecturesButton;
