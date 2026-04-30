"use client"

import * as React from "react"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, limit } from "firebase/firestore"
import { Cloud, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function CloudStatus() {
  const [status, setStatus] = React.useState<"connected" | "disconnected" | "loading">("loading")

  React.useEffect(() => {
    async function checkFirebase() {
      try {
        // Attempt to query a collection (even if empty or mock)
        const q = query(collection(db, "system_status"), limit(1));
        await getDocs(q);
        setStatus("connected");
      } catch (error) {
        console.error("Firebase connection error:", error);
        setStatus("disconnected");
      }
    }
    checkFirebase();
  }, []);

  return (
    <Card className="bg-muted/30 border-dashed">
      <CardContent className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cloud className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold">Google Cloud Status</span>
        </div>
        <div className="flex items-center gap-1.5">
          {status === "loading" && <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />}
          {status === "connected" && (
            <>
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span className="text-[10px] text-green-600 font-medium">Syncing with Firestore</span>
            </>
          )}
          {status === "disconnected" && (
            <>
              <AlertCircle className="w-3 h-3 text-red-500" />
              <span className="text-[10px] text-red-600 font-medium">Offline (Using Local Cache)</span>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
