interface Props {
    message: string
    retry: () => void
  }
  
  export const ErrorScreen = ({ message, retry }: Props) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <p className="text-red-600 font-semibold text-lg">{message}</p>
      <button
        onClick={retry}
        className="mt-4 px-5 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
      >
        Retry
      </button>
    </div>
  )
  