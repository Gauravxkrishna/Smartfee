import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Input } from "../components/ui/input";
import { InstallmentTable } from './installment-table';
import { calculateInstallments } from './calculate-installments';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function FlexSchedule() {
  const navigate = useNavigate(); // Initialize useNavigate
  const initialState = {
    installments: [],
    numberOfInstallments: '4',
    startDate: '2024-10-15',
    repeatEvery: '3',
    adjustAmount: "don't-adjust",
    totalAmount: 40,
  };

  const [state, setState] = useState(initialState);
  const { installments, numberOfInstallments, startDate, repeatEvery, adjustAmount, totalAmount } = state;
  const [savedState, setSavedState] = useState(initialState);

  const totalDonation = installments.reduce((sum, inst) => sum + inst.donation, 0);
  const remainingAmount = totalAmount * 0.25 - totalDonation; // Assuming 25% target donation

  useEffect(() => {
    handleAdjustAmounts();
  }, [numberOfInstallments, startDate, repeatEvery, totalAmount, adjustAmount]);

  const handleDonationChange = (id, donation) => {
    setState((prevState) => ({
      ...prevState,
      installments: prevState.installments.map(inst =>
        inst.id === id ? { ...inst, donation } : inst
      ),
    }));
  };

  const handleAdjustAmounts = () => {
    let newInstallments = calculateInstallments(
      Number(numberOfInstallments),
      startDate,
      Number(repeatEvery),
      totalAmount
    );

    if (adjustAmount === 'adjust-equally') {
      // Logic for equal adjustment is already in calculateInstallments
    } else if (adjustAmount === 'adjust-last') {
      const lastIndex = newInstallments.length - 1;
      const totalWithoutLast = newInstallments.slice(0, -1).reduce((sum, inst) => sum + inst.total, 0);
      newInstallments[lastIndex].total = totalAmount - totalWithoutLast;
      newInstallments[lastIndex].donation = newInstallments[lastIndex].total * 0.25;
    }
    // 'don't-adjust' doesn't need special handling as it's the default behavior

    setState((prevState) => ({
      ...prevState,
      installments: newInstallments,
    }));
  };

  const handleSaveChanges = () => {
    try {
      // Validate the total amount
      if (totalAmount <= 0) {
        throw new Error('Total amount must be greater than 0.');
      }

      // Validate the number of installments
      if (Number(numberOfInstallments) <= 0) {
        throw new Error('Number of installments must be greater than 0.');
      }

      // Validate the repeat interval
      if (Number(repeatEvery) <= 0) {
        throw new Error('Repeat interval must be greater than 0.');
      }

      // Validate the start date
      if (!startDate) {
        throw new Error('Start date is required.');
      }

      // Save the current state
      setSavedState(state);

      // Log the saved state to the console
      console.log('Saving changes:', { installments, totalAmount, adjustAmount });

      // Show success alert
      alert('Changes saved successfully!');

      // Navigate to the home page after saving
      navigate('/institute'); // Replace '/' with your home page route
    } catch (error) {
      // Show error alert
      alert(`Error: ${error.message}`);

      // Log the error to the console
      console.error('Error saving changes:', error);
    }
  };

  const handleDiscardChanges = () => {
    setState(savedState); // Revert to the last saved state
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <CardHeader className="bg-blue-600 text-white p-6 rounded-t-lg">
        <CardTitle className="text-2xl font-bold">Edit Flex Schedule</CardTitle>
        <div className="flex gap-4 mt-4">
          <Button variant="outline" className="bg-white text-blue-600 hover:bg-blue-50">
            Bulk Edit
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            + Add Installment
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-600 font-medium">
              Number of installments
            </label>
            <Input
              type="number"
              value={numberOfInstallments}
              onChange={(e) => setState({ ...state, numberOfInstallments: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600 font-medium">
              Starting from
            </label>
            <div className="relative">
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setState({ ...state, startDate: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600 font-medium">
              Repeat every
            </label>
            <Select value={repeatEvery} onValueChange={(value) => setState({ ...state, repeatEvery: value })}>
              <SelectTrigger className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select months" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
                <SelectItem value="1" className="hover:bg-blue-50">1 Month</SelectItem>
                <SelectItem value="3" className="hover:bg-blue-50">3 Months</SelectItem>
                <SelectItem value="6" className="hover:bg-blue-50">6 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600 font-medium">
              Adjust amounts
            </label>
            <Select value={adjustAmount} onValueChange={(value) => setState({ ...state, adjustAmount: value })}>
              <SelectTrigger className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select adjustment" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
                <SelectItem value="don't-adjust" className="hover:bg-blue-50">Don't Adjust</SelectItem>
                <SelectItem value="adjust-equally" className="hover:bg-blue-50">Adjust Equally</SelectItem>
                <SelectItem value="adjust-last" className="hover:bg-blue-50">Adjust Last</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-600 font-medium">
            Total Amount
          </label>
          <Input
            type="number"
            value={totalAmount}
            onChange={(e) => setState({ ...state, totalAmount: Number(e.target.value) })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <InstallmentTable
          installments={installments}
          onDonationChange={handleDonationChange}
          totalDonation={totalDonation}
          remainingAmount={remainingAmount}
        />
      </CardContent>
      <CardFooter className="flex justify-between border-t p-6 bg-gray-50 rounded-b-lg">
        <div className="text-sm text-gray-500">
          * On clicking save, non-paid convenience fee will be adjusted to first non-paid installment.
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-100" onClick={handleDiscardChanges}>
            Discard
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}