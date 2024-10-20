import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setAccount } from "../../redux/account/accountSlice";
import {
  Button,
  Input,
  Label,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../../components/ui";
import LoadingSpinner from "../../components/loading";
import { setLocalStorage } from "../../utils/localStorage";
import { accountStorageKey } from "../../utils/enums";
import { getAccount } from "../../hooks/accountHooks";
import { getAccountType } from "../../hooks/accounHooksTypes.type";

const defaultData: getAccountType = {
  email: "",
  password: "",
};

export default function SigIn() {
  const [data, setData] = useState<getAccountType>(defaultData);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (data.email === "" || data.password === "") {
      setError("Please fill in all the fields.");
      return;
    }

    setSaving(true);

    const response = await getAccount(data);

    if (response !== null) {
      dispatch(setAccount(response));
      setLocalStorage(accountStorageKey, JSON.stringify(response));
      navigate("/account");
    }

    setData(defaultData);
    setError("");
    setSaving(false);
  };

  const handleChange = (prop: string, value: string) => {
    setData((prev) => ({ ...prev, [prop]: value }));
    setError("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-96">
        <CardHeader>
          <h2 className="text-center text-2xl font-bold">Log in</h2>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onKeyDown={handleKeyDown}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => handleChange("password", e.target.value)}
                onKeyDown={handleKeyDown}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col justify-start">
          <Button
            disabled={saving}
            type="submit"
            onClick={handleSubmit}
            className="w-full"
          >
            {saving ? "Saving..." : "Sign In"}
            {saving ? <LoadingSpinner /> : null}
          </Button>
          <p className="mt-4 text-start w-full">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up.
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
