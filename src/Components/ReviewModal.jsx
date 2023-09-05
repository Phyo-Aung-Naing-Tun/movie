import { Button, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import ReviewPosts from "./ReviewPosts";
import { useSelector } from "react-redux";

const ReviewModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { reviews } = useSelector((state) => state.movieSlice);
  return (
    <div>
      <Modal
        size="calc(100vw)"
        opened={opened}
        onClose={() => {
          close();
        }}
        title="Reviews"
      >
        {reviews?.length !== 0 ? (
          reviews?.map((data) => <ReviewPosts {...data} key={data.id} />)
        ) : (
          <h1 className=" text-xl font-bold ">Sorry! no review yet.</h1>
        )}
      </Modal>

      <Group position="start ">
        <Button
          variant="outline"
          className=" uppercase tracking-wider"
          color="dark"
          onClick={() => {
            open();
          }}
        >
          see Reviews
        </Button>
      </Group>
    </div>
  );
};

export default ReviewModal;
