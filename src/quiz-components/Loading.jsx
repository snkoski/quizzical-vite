import loadingSvg from '../assets/loading.svg'
import './loading.css'

export default function Loading() {
  return (
    <div className="loading-svg">
      <img src={loadingSvg} alt="loading" />
    </div>
  )
};