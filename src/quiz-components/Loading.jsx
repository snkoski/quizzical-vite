import loadingSvg from '../assets/loading.svg'

export default function Loading() {
  return (
    <div className="loading-svg">
      <img src={loadingSvg} alt="loading" />
    </div>
  )
};