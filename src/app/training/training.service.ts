import {ExerciseModel} from './exercise.model';
import {Subject} from 'rxjs/Subject';

export class TrainingService {

  private availableExercise: ExerciseModel[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];

  exerciseChanged = new Subject<ExerciseModel>();
  private runningExercise: ExerciseModel;
  private exercise: ExerciseModel[] = [];

  getAvailableExercise() {
    return this.availableExercise.slice();
  }

  startExercise(selectedId: string) {
    const selectedExercise = this.availableExercise.find(ex => ex.id === selectedId);
    this.runningExercise = selectedExercise;
    console.log(this.runningExercise);
    this.exerciseChanged.next({...this.runningExercise});
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  completeExercise() {
    this.exercise.push({...this.runningExercise, date: new Date(), state: 'completed'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercise.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getCompletedOrCancelledExercise() {
    return this.exercise.slice();
  }

}
